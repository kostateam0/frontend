import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import NewFeed from './NewFeed';
import { Pencil } from 'lucide-react';

export function NewFeedButton() {
  return (
    <Dialog>
      <form>
        <DialogTrigger asChild>
          <Button variant='outline' className='w-full h-12 bg-[#4a6741] dark:bg-[#4a6741]'>
            <Pencil className='mr-2 h-4 w-4' />
            New Feed
          </Button>
        </DialogTrigger>
        {/* <DialogContent className="sm:max-w-[425px]"> */}
        <DialogContent className='max-w-2/5'>
          {/* 훼더 */}
          <DialogHeader>
            <DialogTitle>Edit profile</DialogTitle>
            <DialogDescription>
              Make changes to your profile here. Click save when you&apos;re
              done.
            </DialogDescription>
          </DialogHeader>

          {/* 본문 */}
          <NewFeed />

          {/* 뿌터 */}
          <DialogFooter>
            <DialogClose asChild>
              <Button variant='outline'>Cancel</Button>
            </DialogClose>
            <Button type='submit'>Save changes</Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
}
