import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));

export function getPrivateRoomId(userA: string, userB: string): string {
  const ids = [userA, userB].sort();
  return `room-${ids[0]}-${ids[1]}`;
}

export const compressImage = (file: File): Promise<File> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target?.result as string;
      img.onload = () => {
        const canvas = document.createElement("canvas");
        let width = img.width;
        let height = img.height;

        // ✅ Tăng kích thước tối đa lên 1600px (vẫn đảm bảo nhẹ)
        const MAX_SIZE = 1600;
        if (width > height) {
          if (width > MAX_SIZE) {
            height = (height * MAX_SIZE) / width;
            width = MAX_SIZE;
          }
        } else {
          if (height > MAX_SIZE) {
            width = (width * MAX_SIZE) / height;
            height = MAX_SIZE;
          }
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");
        ctx?.drawImage(img, 0, 0, width, height);

        // ✅ Tăng chất lượng lên 85% (cân bằng giữa nét và dung lượng)
        canvas.toBlob(
          (blob) => {
            if (blob) {
              resolve(new File([blob], file.name, { type: "image/jpeg" }));
            } else {
              reject(new Error("Canvas empty"));
            }
          },
          "image/jpeg",
          0.85,
        );
      };
    };
    reader.onerror = (error) => reject(error);
  });
};
