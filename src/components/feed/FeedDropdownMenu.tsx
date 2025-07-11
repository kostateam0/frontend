import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  MoreHorizontal,
  Edit3,
  Trash2,
  Share2,
  Bookmark,
  Link2,
  Flag,
  EyeOff,
} from 'lucide-react';

interface PostDropdownMenuProps {
  isOwner?: boolean;
  onEdit?: () => void;
  onDelete?: () => void;
  onShare: (e: React.MouseEvent<HTMLDivElement>) => void;
  onBookmark?: () => void;
  onCopyLink?: () => void;
  onReport?: () => void;
  onHide?: () => void;
}

export default function FeedDropdownMenu({
  isOwner = false,
  onEdit,
  onDelete,
  onShare,
  onBookmark,
  onCopyLink,
  onReport,
  onHide,
}: PostDropdownMenuProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className='flex h-8 w-8 items-center justify-center rounded-full transition-colors hover:bg-stone-100 dark:hover:bg-stone-800'>
        <MoreHorizontal className='h-4 w-4 text-stone-600 dark:text-stone-400' />
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align='end'
        sideOffset={5}
        className='w-48 rounded-lg border border-stone-200 bg-white shadow-lg dark:border-stone-700 dark:bg-stone-900'
      >
        {isOwner && (
          <>
            <DropdownMenuItem
              onClick={onEdit}
              className='flex cursor-pointer items-center gap-2 px-3 py-2 text-sm text-stone-700 hover:bg-stone-50 dark:text-stone-300 dark:hover:bg-stone-800'
            >
              <Edit3 className='h-4 w-4' />
              수정하기
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={onDelete}
              className='flex cursor-pointer items-center gap-2 px-3 py-2 text-sm text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/20'
            >
              <Trash2 className='h-4 w-4' />
              삭제하기
            </DropdownMenuItem>
            <DropdownMenuSeparator className='bg-stone-200 dark:bg-stone-700' />
          </>
        )}

        <DropdownMenuItem
          onClick={onShare}
          className='flex cursor-pointer items-center gap-2 px-3 py-2 text-sm text-stone-700 hover:bg-stone-50 dark:text-stone-300 dark:hover:bg-stone-800'
        >
          <Share2 className='h-4 w-4' />
          공유하기
        </DropdownMenuItem>

        <DropdownMenuItem
          onClick={onBookmark}
          className='flex cursor-pointer items-center gap-2 px-3 py-2 text-sm text-stone-700 hover:bg-stone-50 dark:text-stone-300 dark:hover:bg-stone-800'
        >
          <Bookmark className='h-4 w-4' />
          북마크
        </DropdownMenuItem>

        <DropdownMenuItem
          onClick={onCopyLink}
          className='flex cursor-pointer items-center gap-2 px-3 py-2 text-sm text-stone-700 hover:bg-stone-50 dark:text-stone-300 dark:hover:bg-stone-800'
        >
          <Link2 className='h-4 w-4' />
          링크 복사
        </DropdownMenuItem>

        <DropdownMenuSeparator className='bg-stone-200 dark:bg-stone-700' />

        <DropdownMenuItem
          onClick={onHide}
          className='flex cursor-pointer items-center gap-2 px-3 py-2 text-sm text-stone-700 hover:bg-stone-50 dark:text-stone-300 dark:hover:bg-stone-800'
        >
          <EyeOff className='h-4 w-4' />
          숨기기
        </DropdownMenuItem>

        <DropdownMenuItem
          onClick={onReport}
          className='flex cursor-pointer items-center gap-2 px-3 py-2 text-sm text-orange-600 hover:bg-orange-50 dark:text-orange-400 dark:hover:bg-orange-900/20'
        >
          <Flag className='h-4 w-4' />
          신고하기
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
