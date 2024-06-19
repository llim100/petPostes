'use client';

import { useMutation } from 'convex/react';
import { UploadButton, UploadFileResponse } from '@xixixao/uploadstuff/react';
import '@xixixao/uploadstuff/react/styles.css';
import { api } from '../convex/_generated/api';
import { useState } from 'react';
import { Id } from '@/convex/_generated/dataModel';
import { useRouter } from 'next/navigation';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Value } from '@radix-ui/react-select';

export function UploadArea() {
  const [picId, setPicId] = useState<Id<'pictures'> | null>(null);
  const [title, setTitle] = useState<string>('');
  const [category, setCategory] = useState<string>('');
  const router = useRouter();

  const generateUploadUrl = useMutation(api.pictures.generateUploadUrl);
  const savePictureStorageId = useMutation(api.pictures.savePictureStorageId);
  const savePictureAfterUpload = async (uploaded: UploadFileResponse[]) => {
    if (title === '') {
      alert('Please enter a title');
      return;
    }
    if (category === '') {
      alert('Please enter a pet category');
      return;
    }

    const id = await savePictureStorageId({
      picStorageId: (uploaded[0].response as any).storageId,
      title,
      category,
    });
    router.push(`/petposte?q=${title}`);
    setPicId(id);
    setTitle('');
    setCategory('');
  };

  return (
    <div className="w-full mx-auto p-6 bg-slate-950 rounded-lg shadow-md">
      {!picId && (
        <div>
          <h2 className="text-2xl text-white font-semibold mb-4">
            Upload your pet picture
          </h2>
          <div className="mb-4">
            <label
              htmlFor="title"
              className="block font-medium mb-2 text-white"
            >
              Give your pet picture a title
            </label>
            <input
              id="title"
              type="text"
              placeholder="Enter picture title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-200"
            />
            <label
              htmlFor="category"
              className="block font-medium mb-2 text-white"
            >
              Enter the pet category
            </label>
            <Select onValueChange={(value) => setCategory(value)}>
              <SelectTrigger className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-200">
                <SelectValue placeholder="Select a pet category" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Category</SelectLabel>
                  <SelectItem value="dogs">dogs</SelectItem>
                  <SelectItem value="cats">cats</SelectItem>
                  <SelectItem value="others">others</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>

            {/* <input
              id="title"
              type="text"
              placeholder="Enter picture category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-200"
            /> */}
          </div>
          <div className="mb-4">
            <label
              htmlFor="upload"
              className="block font-medium mb-2 text-white"
            >
              Upload the pet image
            </label>
            <UploadButton
              uploadUrl={generateUploadUrl}
              fileTypes={['.pdf', 'image/*']}
              multiple
              onUploadComplete={savePictureAfterUpload}
              onUploadError={(error: unknown) => {
                // Do something with the error.
                alert(`ERROR! ${error}`);
              }}
            />
            {/* <UploadDropzone
              uploadUrl={generateUploadUrl}
              fileTypes={{
                'image/*': ['.png', '.gif', '.jpeg', '.jpg'],
              }}
              onUploadComplete={savePictureAfterUpload}
              onUploadError={(error) => {
                alert(`ERROR! ${error}`);
              }}
            /> */}
          </div>
        </div>
      )}
    </div>
  );
}
