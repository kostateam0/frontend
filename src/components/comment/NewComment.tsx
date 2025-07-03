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
import { useParams } from 'react-router-dom';

interface CommentDialogProps {
  isOpen: boolean;
  onClose: () => void;
  feedID: string;
  initialContent?: string;
  feedContent?: string; // 피드 내용은 선택적
}

export function NewComment({ initialContent = '' }: CommentDialogProps) {
  const [content, setContent] = useState(initialContent);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { feedID } = useParams();

  const handleSubmit = async () => {
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
      console.log(result);

      toast.success(result.message || '댓글이 성공적으로 작성되었습니다.');

      setContent('');
    } catch (error) {
      toast.error(
        `댓글 작성 중 오류가 발생했습니다: ${error instanceof Error ? error.message : '알 수 없는 오류'}`,
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setContent(initialContent);
  };

  return (
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
      <div className='flex justify-end gap-2'>
        <Button variant='outline' onClick={handleClose} disabled={isSubmitting}>
          취소
        </Button>
        <Button onClick={handleSubmit} disabled={isSubmitting}>
          {isSubmitting ? '전송 중...' : '댓글 작성'}
        </Button>
      </div>
    </div>
  );
}
