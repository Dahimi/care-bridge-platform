import { Card } from "@/components/ui/card";
import { MediaAttachments } from "@/types";
import { ImageIcon, Music } from "lucide-react";
import Image from "next/image";

interface MediaGalleryProps {
  media: MediaAttachments;
}

export function MediaGallery({ media }: MediaGalleryProps) {
  const hasDrawings = media.drawings.length > 0;
  const hasAudio = media.audio_recordings.length > 0;
  const hasPhotos = media.photos.length > 0;

  if (!hasDrawings && !hasAudio && !hasPhotos) {
    return (
      <Card className="p-6">
        <p className="text-muted-foreground text-center">No media attachments available</p>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {hasDrawings && (
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <ImageIcon className="h-5 w-5" />
            Drawings
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {media.drawings.map((drawing, index) => (
              <div key={index} className="relative aspect-square">
                <Image
                  src={drawing}
                  alt={`Drawing ${index + 1}`}
                  fill
                  className="object-cover rounded-md"
                />
              </div>
            ))}
          </div>
        </Card>
      )}

      {hasPhotos && (
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <ImageIcon className="h-5 w-5" />
            Photos
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {media.photos.map((photo, index) => (
              <div key={index} className="relative aspect-square">
                <Image
                  src={photo}
                  alt={`Photo ${index + 1}`}
                  fill
                  className="object-cover rounded-md"
                />
              </div>
            ))}
          </div>
        </Card>
      )}

      {hasAudio && (
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <Music className="h-5 w-5" />
            Audio Recordings
          </h2>
          <div className="space-y-4">
            {media.audio_recordings.map((audio, index) => (
              <div key={index} className="w-full">
                <audio controls className="w-full">
                  <source src={audio} type="audio/mpeg" />
                  Your browser does not support the audio element.
                </audio>
              </div>
            ))}
          </div>
        </Card>
      )}
    </div>
  );
} 