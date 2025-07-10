import { useState } from 'react';
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
import {
  ImageIcon,
  MapPin,
  Smile,
  Users,
  X,
  Camera,
} from 'lucide-react';
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
  images?: string[],
) => {
  const response = await fetch('/api/feed', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify({ userID, content, privacy, images }),
  });

  if (!response.ok) {
    throw new Error('Failed to create feed');
  }

  return response.json();
};

export function NewFeed({ isOpen, onClose }: NewFeedModalProps) {
  const [content, setContent] = useState('');
  const [selectedImages, setSelectedImages] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const maxLength = 280;
  const queryClient = useQueryClient();

  const handleImageUpload = () => {
    const mockImage = '/placeholder.svg?height=200&width=200';
    setSelectedImages([...selectedImages, mockImage]);
  };

  const removeImage = (index: number) => {
    setSelectedImages(selectedImages.filter((_, i) => i !== index));
  };

  const handlePost = async () => {
    if (!content.trim()) {
      toast.warning('내용을 입력해주세요.');
      return;
    }

    setIsSubmitting(true);
    try {
      await createFeed('TEST001', content, 'public', selectedImages);
      toast.success('게시물이 작성되었습니다.');
      setContent('');
      setSelectedImages([]);
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
    setSelectedImages([]);
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

        {selectedImages.length > 0 && (
          <div className='grid grid-cols-2 gap-2 mt-4'>
            {selectedImages.map((image, index) => (
              <div key={index} className='group relative'>
                <img
                  src={image}
                  alt={`Upload ${index + 1}`}
                  className='h-32 w-full rounded-lg object-cover'
                />
                <Button
                  variant='destructive'
                  size='icon'
                  className='absolute top-2 right-2 h-6 w-6 opacity-0 transition-opacity group-hover:opacity-100'
                  onClick={() => removeImage(index)}
                >
                  <X className='h-3 w-3' />
                </Button>
              </div>
            ))}
          </div>
        )}

        <div className='flex items-center justify-between border-t pt-4 mt-4'>
          <div className='flex items-center space-x-1'>
            <Button
              variant='ghost'
              size='icon'
              className='h-9 w-9 text-blue-500 hover:bg-blue-50'
              onClick={handleImageUpload}
              disabled={isSubmitting}
            >
              <Camera className='h-4 w-4' />
            </Button>
            <Button variant='ghost' size='icon' className='h-9 w-9 text-blue-500'>
              <ImageIcon className='h-4 w-4' />
            </Button>
            <Button variant='ghost' size='icon' className='h-9 w-9 text-blue-500'>
              <Smile className='h-4 w-4' />
            </Button>
            <Button variant='ghost' size='icon' className='h-9 w-9 text-blue-500'>
              <MapPin className='h-4 w-4' />
            </Button>
            <Button variant='ghost' size='icon' className='h-9 w-9 text-blue-500'>
              <Users className='h-4 w-4' />
            </Button>
          </div>
        </div>

        <DialogFooter className='pt-4'>
          <Button variant='outline' onClick={handleClose} disabled={isSubmitting}>
            취소
          </Button>
          <Button
            onClick={handlePost}
            disabled={!content.trim() || content.length > maxLength || isSubmitting}
            className='bg-blue-500 text-white hover:bg-blue-600'
          >
            {isSubmitting ? '게시 중...' : '게시하기'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
