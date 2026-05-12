"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { ArrowLeft, Bot, Send, User2 } from "lucide-react";

import { CleanGridBackground } from "@/components/ui/bgRipple";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/shadcn/alert";
import { Avatar, AvatarFallback } from "@/components/ui/shadcn/avatar";
import { Badge } from "@/components/ui/shadcn/badge";
import { Button } from "@/components/ui/shadcn/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/shadcn/card";
import { ScrollArea } from "@/components/ui/shadcn/scroll-area";
import { Separator } from "@/components/ui/shadcn/separator";
import { Textarea } from "@/components/ui/shadcn/textarea";
import {
  chatbotStarterPrompts,
  getChatbotResponse,
} from "@/lib/portfolioExperience";
import type { ChatbotMessage } from "@/lib/types";

const createMessage = (
  role: ChatbotMessage["role"],
  content: string
): ChatbotMessage => ({
  id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
  role,
  content,
});

export default function ChatbotExperience() {
  const [value, setValue] = useState("");
  const [messages, setMessages] = useState<ChatbotMessage[]>([
    createMessage(
      "assistant",
      "I’m Ron’s portfolio bot. Ask me about projects, skills, experience, process, resume, or contact details."
    ),
  ]);
  const [showFallbackAlert, setShowFallbackAlert] = useState(false);

  const starterPrompts = useMemo(() => chatbotStarterPrompts, []);

  const sendMessage = (content: string) => {
    const trimmed = content.trim();
    if (!trimmed) return;

    const response = getChatbotResponse(trimmed);

    setMessages((prev) => [
      ...prev,
      createMessage("user", trimmed),
      createMessage("assistant", response.message),
    ]);
    setShowFallbackAlert(Boolean(response.isFallback));
    setValue("");
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    sendMessage(value);
  };

  return (
    <div className="relative min-h-screen bg-background px-4 pb-[200px] pt-28 sm:px-6 lg:px-8">
      <CleanGridBackground className="fixed inset-0 z-0" />
      <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-col gap-6">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div className="space-y-3">
            <Badge variant="outline" className="border-primary/30 bg-primary/10 text-primary">
              portfolio-only assistant
            </Badge>
            <div>
              <h1 className="font-rawkner text-4xl text-foreground sm:text-5xl">
                Chatbot
              </h1>
              <p className="mt-2 max-w-2xl text-sm text-muted-foreground sm:text-base">
                Ask focused questions about Ron’s projects, skills, experience, workflow, resume, and contact details.
              </p>
            </div>
          </div>

          <Button asChild variant="outline" className="w-fit">
            <Link href="/">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back To Portfolio
            </Link>
          </Button>
        </div>

        {showFallbackAlert ? (
          <Alert className="border-2 border-foreground bg-primary/10 shadow-brutal-sm rounded-none">
            <Bot className="h-4 w-4" />
            <AlertTitle className="font-mono uppercase font-bold text-foreground">Portfolio-only scope</AlertTitle>
            <AlertDescription className="text-foreground/80">
              This chatbot only answers questions about Ron and the portfolio content available in this app.
            </AlertDescription>
          </Alert>
        ) : null}

        <div className="border-y-2 border-foreground bg-foreground/5 py-4 -mx-4 px-4 sm:mx-0 sm:px-6 sm:border-2 sm:shadow-brutal">
          <div className="flex items-center justify-between">
            <h2 className="flex items-center gap-2 text-lg font-mono uppercase font-bold tracking-widest text-foreground">
              <Bot className="h-5 w-5 text-primary" />
              Recruiter-friendly chat
            </h2>
          </div>
          <p className="mt-1 font-mono text-xs uppercase text-foreground/50 font-bold tracking-wider">
            No external AI calls in v1. Responses come from local portfolio knowledge only.
          </p>
        </div>

        <div className="flex flex-wrap gap-2 pt-2">
          {starterPrompts.map((prompt) => (
            <Button
              key={prompt}
              type="button"
              variant="outline"
              size="sm"
              className="h-auto whitespace-normal text-left text-xs font-mono border-2 border-foreground rounded-none bg-background shadow-brutal-sm hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-brutal hover:bg-foreground hover:text-background transition-all duration-150 uppercase font-bold"
              onClick={() => sendMessage(prompt)}
            >
              {prompt}
            </Button>
          ))}
        </div>

        <div className="space-y-6 pt-6">
                {messages.map((message) => {
                  const isAssistant = message.role === "assistant";
                  return (
                    <div
                      key={message.id}
                      className={`flex items-start gap-3 ${
                        isAssistant ? "" : "justify-end"
                      }`}
                    >
                      {isAssistant ? (
                        <Avatar className="border-2 border-foreground bg-primary rounded-none shadow-brutal-sm">
                          <AvatarFallback className="bg-transparent text-background font-bold">
                            <Bot className="h-4 w-4" />
                          </AvatarFallback>
                        </Avatar>
                      ) : null}

                      <div
                        className={`max-w-[85%] border-2 border-foreground px-4 py-3 text-sm leading-relaxed shadow-brutal-sm ${
                          isAssistant
                            ? "bg-background text-foreground"
                            : "bg-primary text-background font-bold"
                        }`}
                      >
                        {message.content}
                      </div>

                      {!isAssistant ? (
                        <Avatar className="border-2 border-foreground bg-background rounded-none shadow-brutal-sm">
                          <AvatarFallback className="bg-transparent text-foreground font-bold">
                            <User2 className="h-4 w-4" />
                          </AvatarFallback>
                        </Avatar>
                      ) : null}
                    </div>
                  );
                })}
        </div>

        <div className="fixed bottom-0 left-0 right-0 z-40 border-t-2 border-foreground bg-background p-4 sm:p-6">
          <form onSubmit={handleSubmit} className="mx-auto flex w-full max-w-6xl flex-col gap-3 sm:flex-row">
                <Textarea
                  value={value}
                  onChange={(event) => setValue(event.target.value)}
                  placeholder="Ask about projects, skills, experience, process, resume, or contact details"
                  className="min-h-[60px] max-h-[120px] flex-1 border-2 border-foreground rounded-none shadow-brutal-sm font-mono text-sm focus-visible:ring-primary resize-y"
                  aria-label="Chatbot message input"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleSubmit(e as any);
                    }
                  }}
                />
                <div className="flex shrink-0">
                  <Button type="submit" className="h-full border-2 border-foreground shadow-brutal-sm rounded-none hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-brutal transition-all duration-150 font-mono font-bold uppercase tracking-wider bg-primary text-background hover:bg-primary/90">
                    <Send className="mr-2 h-4 w-4" />
                    Send
                  </Button>
                </div>
          </form>
        </div>
      </div>
    </div>
  );
}
