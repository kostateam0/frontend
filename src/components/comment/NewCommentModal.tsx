import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogTitle,
} from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { useQueryClient } from '@tanstack/react-query';

interface CommentDialogProps {
  isOpen: boolean;
  onClose: () => void;
  feedID: string;
  initialContent?: string;
  feedContent?: string; // 피드 내용은 선택적
}

export function NewCommentModal({
  isOpen,
  onClose,
  feedID,
  feedContent,
  initialContent = '',
}: CommentDialogProps) {
  const [content, setContent] = useState(initialContent);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const queryClient = useQueryClient();

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (!content.trim()) {
      toast.warning('댓글 내용을 입력해주세요.');
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch(`/api/comment/${feedID}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          content: content.trim(),
          feedID: feedID,
        }),
      });

      if (!response.ok) {
        throw new Error('댓글 전송에 실패했습니다.');
      }

      const result = await response.json();
      toast.success(result.message || '댓글이 성공적으로 작성되었습니다.');

      setContent('');

      queryClient.invalidateQueries({ queryKey: ['feeds'] });

      onClose();
    } catch (error) {
      toast.error(
        `댓글 작성 중 오류가 발생했습니다: ${error instanceof Error ? error.message : '알 수 없는 오류'}`,
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = (open: boolean) => {
    if (!open) {
      setContent(initialContent);
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogOverlay className='fixed inset-0 z-40 bg-black/50' />
      <DialogContent className='pointer-events-auto z-[100] sm:max-w-[425px] dark:bg-[#1a1a1a]'>
        <DialogHeader>
          <DialogTitle>댓글 작성</DialogTitle>
          <DialogDescription className='dark:text-[#]'>
            {feedContent}
          </DialogDescription>
        </DialogHeader>
        <div className='grid gap-4 py-4'>
          <div className='grid gap-2'>
            <Label htmlFor='content'>댓글 내용</Label>
            <Textarea
              id='content'
              placeholder='댓글을 입력하세요...'
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className='min-h-[100px]'
              disabled={isSubmitting}
            />
          </div>
        </div>
        <DialogFooter>
          <Button
            className='hover:cursor-pointer'
            variant='outline'
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              handleClose(false);
            }}
            disabled={isSubmitting}
          >
            취소
          </Button>
          <Button onClick={handleSubmit} disabled={isSubmitting}>
            {isSubmitting ? '전송 중...' : '댓글 작성'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
