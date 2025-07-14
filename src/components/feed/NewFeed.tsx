import { useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogTitle,
} from '@/components/ui/dialog';
import { ImageIcon, MapPin, Smile, Users, X, Camera } from 'lucide-react';
import { useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

interface NewFeedModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const createFeed = async (
  userID: string,
  content: string,
  privacy?: string,
  files?: File[],
) => {
  const formData = new FormData();
  formData.append('userID', userID);
  formData.append('content', content);
  formData.append('privacy', privacy || 'public');

  files?.forEach((file) => {
    formData.append(`images`, file); // 'images'는 서버에서 받을 필드명
  });

  const response = await fetch('http://192.168.0.42:4000/api/feed', {
    method: 'POST',
    credentials: 'include',
    body: formData,
  });

  if (!response.ok) {
    throw new Error('Failed to create feed');
  }

  return response.json();
};

export function NewFeed({ isOpen, onClose }: NewFeedModalProps) {
  const [content, setContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const imagePickerRef = useRef<HTMLInputElement | null>(null);
  const maxLength = 280;
  const queryClient = useQueryClient();

  // const [selectedImages, setSelectedImages] = useState<string[]>([]);
  const [previewUrl, setPreviewUrl] = useState<string[]>([]);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const maxImages = 5;
    const maxSizeMB = 5;
    const validFiles: File[] = [];

    const currentCount = selectedFiles.length;

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const fileSizeMB = file.size / (1024 * 1024);

      if (!file.type.startsWith('image/')) {
        toast.error(`'${file.name}'은 이미지 파일이 아닙니다.`);
        continue;
      }

      if (fileSizeMB > maxSizeMB) {
        toast.error(`'${file.name}'은 ${maxSizeMB}MB를 초과합니다.`);
        continue;
      }

      if (currentCount + validFiles.length >= maxImages) {
        toast.warning(`이미지는 최대 ${maxImages}장까지 업로드할 수 있습니다.`);
        break;
      }

      validFiles.push(file);
    }

    validFiles.forEach((file) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl((prev) => [...prev, reader.result as string]);
      };
      reader.readAsDataURL(file);
    });

    setSelectedFiles((prev) => [...prev, ...validFiles]);
    e.target.value = '';
  };

  const handleImagePickerClick = () => {
    if (imagePickerRef.current) {
      imagePickerRef.current.click();
    }
    // const mockImage = '/placeholder.svg?height=200&width=200';
    // setSelectedImages([...selectedImages, mockImage]);
  };

  const removeImage = (index: number) => {
    setPreviewUrl(previewUrl.filter((_, i) => i !== index));
    setSelectedFiles(selectedFiles.filter((_, i) => i !== index));
  };

  const handlePost = async () => {
    if (!content.trim()) {
      toast.warning('내용을 입력해주세요.');
      return;
    }

    setIsSubmitting(true);
    try {
      await createFeed('TEST001', content, 'public', selectedFiles);

      toast.success('게시물이 작성되었습니다.');
      setContent('');
      setSelectedFiles([]);
      queryClient.invalidateQueries({ queryKey: ['feeds'] });
      onClose();
    } catch (error) {
      toast.error(
        `게시물 작성 실패: ${
          error instanceof Error ? error.message : '알 수 없는 오류'
        }`,
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setContent('');
    setPreviewUrl([]);
    setSelectedFiles([]);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogOverlay className='fixed inset-0 z-40 bg-black/50' />
      <DialogContent className='pointer-events-auto z-[100] sm:max-w-2xl dark:bg-[#1a1a1a]'>
        <DialogHeader>
          <DialogTitle>새 게시물 작성</DialogTitle>
          <DialogDescription>새로은 소식이 있나요?</DialogDescription>
        </DialogHeader>

        <div className='flex items-start space-x-4'>
          {/* <Avatar className='h-12 w-12'>
            <AvatarImage src='/placeholder.svg?height=48&width=48' alt='User' />
          </Avatar> */}
          <Textarea
            placeholder='내용을 입력하세요...'
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className='placeholder:text-muted-foreground min-h-[120px] resize-none border-0 p-0 text-lg focus-visible:ring-0'
            maxLength={maxLength}
            disabled={isSubmitting}
          />
        </div>

        {selectedFiles.length > 0 && (
          <div className='mt-4 grid grid-cols-2 gap-2'>
            {previewUrl.map((url, index) => (
              <div key={index} className='group relative'>
                <img
                  src={url}
                  alt={`Upload ${index + 1}`}
                  className='h-32 w-full rounded-lg object-cover'
                />
                <Button
                  variant='destructive'
                  size='icon'
                  className='absolute top-2 right-2 z-20 h-6 w-6 opacity-0 group-hover:opacity-100'
                  onClick={() => removeImage(index)}
                >
                  <X className='h-3 w-3' />
                </Button>
              </div>
            ))}
          </div>
        )}

        <div className='mt-4 flex items-center justify-between border-t pt-4'>
          <div className='flex items-center space-x-1'>
            <input
              ref={imagePickerRef}
              type='file'
              accept='image/*'
              className='hidden'
              id='image-upload'
              multiple
              onChange={handleImageUpload}
            />

            <Button
              variant='ghost'
              size='icon'
              className='h-9 w-9 text-blue-500 hover:bg-blue-50'
              onClick={handleImagePickerClick}
              disabled={isSubmitting}
            >
              <Camera className='h-4 w-4' />
            </Button>
            <Button
              variant='ghost'
              size='icon'
              className='h-9 w-9 text-blue-500'
            >
              <ImageIcon className='h-4 w-4' />
            </Button>
            <Button
              variant='ghost'
              size='icon'
              className='h-9 w-9 text-blue-500'
            >
              <Smile className='h-4 w-4' />
            </Button>
            <Button
              variant='ghost'
              size='icon'
              className='h-9 w-9 text-blue-500'
            >
              <MapPin className='h-4 w-4' />
            </Button>
            <Button
              variant='ghost'
              size='icon'
              className='h-9 w-9 text-blue-500'
            >
              <Users className='h-4 w-4' />
            </Button>
          </div>
        </div>

        <DialogFooter className='pt-4'>
          <Button
            variant='outline'
            onClick={handleClose}
            disabled={isSubmitting}
          >
            취소
          </Button>
          <Button
            onClick={handlePost}
            disabled={
              !content.trim() || content.length > maxLength || isSubmitting
            }
            className='bg-blue-500 text-white hover:bg-blue-600'
          >
            {isSubmitting ? '게시 중...' : '게시하기'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
