import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { ImageIcon, MapPin, Smile, Users, Globe, Lock, X, Camera } from "lucide-react"

// POST 함수 http://localhost:4000/api/feed 
const createFeed = async (userID: string, content: string, privacy?: string, images?: string[]) => {
  const response = await fetch("/api/feed", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ userID, content, privacy, images }),
  })

  if (!response.ok) {
    throw new Error("Failed to create feed")
  }

  return response.json()
}

export default function NewFeed() {
  const [content, setContent] = useState("")
  const [privacy, setPrivacy] = useState("public")
  const [selectedImages, setSelectedImages] = useState<string[]>([])
  const maxLength = 280

  const handleImageUpload = () => {
    const mockImage = "/placeholder.svg?height=200&width=200"
    setSelectedImages([...selectedImages, mockImage])
  }

  const removeImage = (index: number) => {
    setSelectedImages(selectedImages.filter((_, i) => i !== index))
  }

  const handlePost = () => {
    if (content.trim()) {
      console.log("Posting:", { content, privacy, images: selectedImages })
      createFeed('TEST001', content)
      setContent("")
      setSelectedImages([])
    }
    
  }

  return (
    <Card className="w-full mx-auto">
      <CardHeader className="pb-4">
        <div className="flex items-start space-x-4">
          <Avatar className="w-12 h-12">
            <AvatarImage src="/placeholder.svg?height=48&width=48" alt="User" />
            {/* <AvatarFallback>유저이름</AvatarFallback> */}
          </Avatar>
          <div className="flex-1">
            <h3 className="font-semibold text-lg">새 게시물 작성</h3>
            <p className="text-sm text-muted-foreground">무슨 일이 일어나고 있나요?</p>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <Textarea
          placeholder="지금 무슨 생각을 하고 계신가요?"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="min-h-[120px] resize-none border-0 p-0 text-lg placeholder:text-muted-foreground focus-visible:ring-0"
          maxLength={maxLength}
        />

        {selectedImages.length > 0 && (
          <div className="grid grid-cols-2 gap-2">
            {selectedImages.map((image, index) => (
              <div key={index} className="relative group">
                <img
                  src={image || "/placeholder.svg"}
                  alt={`Upload ${index + 1}`}
                  className="w-full h-32 object-cover rounded-lg"
                />
                <Button
                  variant="destructive"
                  size="icon"
                  className="absolute top-2 right-2 h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={() => removeImage(index)}
                >
                  <X className="h-3 w-3" />
                </Button>
              </div>
            ))}
          </div>
        )}

        <div className="flex items-center justify-between pt-4 border-t">
          <div className="flex items-center space-x-1">
            <Button
              variant="ghost"
              size="icon"
              className="h-9 w-9 text-blue-500 hover:bg-blue-50"
              onClick={handleImageUpload}
            >
              <Camera className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" className="h-9 w-9 text-blue-500 hover:bg-blue-50">
              <ImageIcon className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" className="h-9 w-9 text-blue-500 hover:bg-blue-50">
              <Smile className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" className="h-9 w-9 text-blue-500 hover:bg-blue-50">
              <MapPin className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" className="h-9 w-9 text-blue-500 hover:bg-blue-50">
              <Users className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>

      <CardFooter className="flex justify-between items-center pt-4">
        <Button variant="ghost">임시저장</Button>
        <div className="flex space-x-2">
          <Button variant="outline" className="bg-white text-gray-700">
            취소
          </Button>
          <Button
            onClick={handlePost}
            disabled={!content.trim() || content.length > maxLength}
            className="bg-blue-500 hover:bg-blue-600 text-white"
          >
            게시하기
          </Button>
        </div>
      </CardFooter>
    </Card>
  )
}
