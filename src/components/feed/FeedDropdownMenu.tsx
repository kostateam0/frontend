import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { MoreHorizontal, Edit3, Trash2, Share2, Bookmark, Link2, Flag, EyeOff } from "lucide-react"

interface PostDropdownMenuProps {
  isOwner?: boolean
  onEdit?: () => void
  onDelete?: () => void
  onShare?: () => void
  onBookmark?: () => void
  onCopyLink?: () => void
  onReport?: () => void
  onHide?: () => void
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
      <DropdownMenuTrigger className="flex items-center justify-center w-8 h-8 rounded-full hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors">
        <MoreHorizontal className="w-4 h-4 text-stone-600 dark:text-stone-400" />
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        sideOffset={5}
        className="w-48 bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-700 shadow-lg rounded-lg"
      >
        {isOwner && (
          <>
            <DropdownMenuItem
              onClick={onEdit}
              className="flex items-center gap-2 px-3 py-2 text-sm text-stone-700 dark:text-stone-300 hover:bg-stone-50 dark:hover:bg-stone-800 cursor-pointer"
            >
              <Edit3 className="w-4 h-4" />
              수정하기
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={onDelete}
              className="flex items-center gap-2 px-3 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 cursor-pointer"
            >
              <Trash2 className="w-4 h-4" />
              삭제하기
            </DropdownMenuItem>
            <DropdownMenuSeparator className="bg-stone-200 dark:bg-stone-700" />
          </>
        )}

        <DropdownMenuItem
          onClick={onShare}
          className="flex items-center gap-2 px-3 py-2 text-sm text-stone-700 dark:text-stone-300 hover:bg-stone-50 dark:hover:bg-stone-800 cursor-pointer"
        >
          <Share2 className="w-4 h-4" />
          공유하기
        </DropdownMenuItem>

        <DropdownMenuItem
          onClick={onBookmark}
          className="flex items-center gap-2 px-3 py-2 text-sm text-stone-700 dark:text-stone-300 hover:bg-stone-50 dark:hover:bg-stone-800 cursor-pointer"
        >
          <Bookmark className="w-4 h-4" />
          북마크
        </DropdownMenuItem>

        <DropdownMenuItem
          onClick={onCopyLink}
          className="flex items-center gap-2 px-3 py-2 text-sm text-stone-700 dark:text-stone-300 hover:bg-stone-50 dark:hover:bg-stone-800 cursor-pointer"
        >
          <Link2 className="w-4 h-4" />
          링크 복사
        </DropdownMenuItem>

        <DropdownMenuSeparator className="bg-stone-200 dark:bg-stone-700" />

        <DropdownMenuItem
          onClick={onHide}
          className="flex items-center gap-2 px-3 py-2 text-sm text-stone-700 dark:text-stone-300 hover:bg-stone-50 dark:hover:bg-stone-800 cursor-pointer"
        >
          <EyeOff className="w-4 h-4" />
          숨기기
        </DropdownMenuItem>

        <DropdownMenuItem
          onClick={onReport}
          className="flex items-center gap-2 px-3 py-2 text-sm text-orange-600 dark:text-orange-400 hover:bg-orange-50 dark:hover:bg-orange-900/20 cursor-pointer"
        >
          <Flag className="w-4 h-4" />
          신고하기
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
