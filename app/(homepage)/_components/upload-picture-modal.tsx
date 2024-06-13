import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog';
import { UploadArea } from '@/components/upload-area';
import { Upload } from 'lucide-react';
import { Hint } from '@/components/hint';

export const UploadPictureModal = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="default" className="mr-4 text-white bg-slate-800">
          <Hint
            label="upload your pet picture"
            side="bottom"
            align="center"
            sideOffset={5}
          >
            <Upload className="text-white h-6 w-6" />
          </Hint>
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-slate-950 border-0">
        <UploadArea />
      </DialogContent>
    </Dialog>
  );
};
