"use client"

import { Editor } from "@tiptap/react";
import {
  Bold,
  Italic,
  Strikethrough,
  Code,
  Heading1,
  Heading2,
  Heading3,
  List,
  ListOrdered,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Link,
  Undo,
  Redo,
  ListIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Toggle } from "@/components/ui/toggle";
import { cn } from "@/lib/utils";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface iAppProps{
    editor:Editor |null;
}
export function MenuBar({editor}:iAppProps) {
    if(!editor){
        return null;
    }
    return(
        <div className="border border-border rounded-t-lg p-2 bg-card flex flex-wrap gap-1 items-center">
            <TooltipProvider>
            <div className="flex flex-wrap gap-1">
            <Tooltip>
                <TooltipTrigger asChild>
                    <Toggle size="sm" pressed={editor.isActive("bold")} onPressedChange={()=>
                        editor.chain().focus().toggleBold().run()
                    }
                    className={cn(
                        editor.isActive("bold") && "bg-muted-foreground"
                    )}
                    >
                        <Bold className="h-4 w-4" />
                        </Toggle>
                </TooltipTrigger>
                <TooltipContent>Bold</TooltipContent>
                </Tooltip>


                <Tooltip>
                <TooltipTrigger asChild>
                    <Toggle size="sm" pressed={editor.isActive("italic")} onPressedChange={()=>
                        editor.chain().focus().toggleItalic().run()
                    }
                    className={cn(
                        editor.isActive("italic") && "bg-muted-foreground"
                    )}
                    >
                        <Italic className="h-4 w-4" />
                        </Toggle>
                </TooltipTrigger>
                <TooltipContent>Italic</TooltipContent>
                </Tooltip>


                <Tooltip>
                <TooltipTrigger asChild>
                    <Toggle size="sm" pressed={editor.isActive("strike")} onPressedChange={()=>
                        editor.chain().focus().toggleStrike().run()
                    }
                    className={cn(
                        editor.isActive("strike") && "bg-muted-foreground"
                    )}
                    >
                        <Strikethrough className="h-4 w-4" />
                        </Toggle>
                </TooltipTrigger>
                <TooltipContent>Strike</TooltipContent>
                </Tooltip>

                <Tooltip>
                <TooltipTrigger asChild>
                    <Toggle size="sm" pressed={editor.isActive("heading",{level:1})} onPressedChange={()=>
                        editor.chain().focus().toggleHeading({level:1}).run()
                    }
                    className={cn(
                        editor.isActive("heading",{level:1}) && "bg-muted-foreground"
                    )}
                    >
                        <Heading1 className="h-4 w-4" />
                        </Toggle>
                </TooltipTrigger>
                <TooltipContent>Heading 1</TooltipContent>
                </Tooltip>



                <Tooltip>
                <TooltipTrigger asChild>
                    <Toggle size="sm" pressed={editor.isActive("heading",{level:2})} onPressedChange={()=>
                        editor.chain().focus().toggleHeading({level:2}).run()
                    }
                    className={cn(
                        editor.isActive("heading",{level:2}) && "bg-muted-foreground"
                    )}
                    >
                        <Heading2 className="h-4 w-4" />
                        </Toggle>
                </TooltipTrigger>
                <TooltipContent>Heading 2</TooltipContent>
                </Tooltip>


                <Tooltip>
                <TooltipTrigger asChild>
                    <Toggle size="sm" pressed={editor.isActive("heading",{level:3})} onPressedChange={()=>
                        editor.chain().focus().toggleHeading({level:3}).run()
                    }
                    className={cn(
                        editor.isActive("heading",{level:3}) && "bg-muted-foreground"
                    )}
                    >
                        <Heading3 className="h-4 w-4" />
                        </Toggle>
                </TooltipTrigger>
                <TooltipContent>Heading 3</TooltipContent>
                </Tooltip> 


                <Tooltip>
                <TooltipTrigger asChild>
                    <Toggle size="sm" pressed={editor.isActive("bulletList")} onPressedChange={()=>
                        editor.chain().focus().toggleBulletList().run()
                    }
                    className={cn(
                        editor.isActive("bulletList") && "bg-muted-foreground"
                    )}
                    >
                        <ListIcon className="h-4 w-4" />
                        </Toggle>
                </TooltipTrigger>
                <TooltipContent>Bullet List</TooltipContent>
                </Tooltip>


                <Tooltip>
                <TooltipTrigger asChild>
                    <Toggle size="sm" pressed={editor.isActive("orderedList")} onPressedChange={()=>
                        editor.chain().focus().toggleOrderedList().run()
                    }
                    className={cn(
                        editor.isActive("orderedList") && "bg-muted-foreground"
                    )}
                    >
                        <ListOrdered className="h-4 w-4" />
                        </Toggle>




                </TooltipTrigger>
                <TooltipContent>Ordered List</TooltipContent>
                </Tooltip>



        </div>

        <div className="w-px h-6 bg-border mx-2"></div>
                    <div className="flex flex-wrap gap-1">
                    <Tooltip>
                <TooltipTrigger asChild>
                    <Toggle size="sm" pressed={editor.isActive({teztAlign:"left"})} onPressedChange={()=>
                        editor.chain().focus().setTextAlign("left").run()
                    }
                    className={cn(
                        editor.isActive({textAlign:"left"}) && "bg-muted-foreground"
                    )}
                    >
                        <AlignLeft className="h-4 w-4" />
                        </Toggle>




                </TooltipTrigger>
                <TooltipContent>Align Left</TooltipContent>
                </Tooltip>

                <Tooltip>
                <TooltipTrigger asChild>
                    <Toggle size="sm" pressed={editor.isActive({teztAlign:"center"})} onPressedChange={()=>
                        editor.chain().focus().setTextAlign("center").run()
                    }
                    className={cn(
                        editor.isActive({textAlign:"center"}) && "bg-muted-foreground"
                    )}
                    >
                        <AlignCenter className="h-4 w-4" />
                        </Toggle>




                </TooltipTrigger>
                <TooltipContent>Align Center</TooltipContent>
                </Tooltip>



                <Tooltip>
                <TooltipTrigger asChild>
                    <Toggle size="sm" pressed={editor.isActive({teztAlign:"right"})} onPressedChange={()=>
                        editor.chain().focus().setTextAlign("right").run()
                    }
                    className={cn(
                        editor.isActive({textAlign:"right"}) && "bg-muted-foreground"
                    )}
                    >
                        <AlignRight className="h-4 w-4" />
                        </Toggle>




                </TooltipTrigger>
                <TooltipContent>Align Right</TooltipContent>
                </Tooltip>
     </div>


                    <div className="w-px h-6 bg-border mx-2"></div>
                    <div className="flex flex-wrap gap-1">
                    <Tooltip>
                             <TooltipTrigger asChild>
                             <Button
                                        size="sm"
                                                     variant="ghost"
                                                 type="button"
                                 disabled={!editor.can().undo()}
                                         onClick={() => editor.chain().focus().undo().run()}
                                    >
                                     <Undo className="h-4 w-4" />
                                        </Button>




                </TooltipTrigger>
                <TooltipContent>Undo</TooltipContent>
                </Tooltip>


                <Tooltip>
                             <TooltipTrigger asChild>
                             <Button
                                        size="sm"
                                                     variant="ghost"
                                                 type="button"
                                 disabled={!editor.can().redo()}
                                         onClick={() => editor.chain().focus().redo().run()}
                                    >
                                     <Redo className="h-4 w-4" />
                                        </Button>




                </TooltipTrigger>
                <TooltipContent>Redo</TooltipContent>
                </Tooltip>
                    </div>
            </TooltipProvider>

        </div>
    )
}