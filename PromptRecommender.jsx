import { useState } from 'react';
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";

export default function PromptRecommender() {
  const [goal, setGoal] = useState('블로그 글쓰기');
  const [style, setStyle] = useState('친근한');
  const [prompt, setPrompt] = useState('');

  const templates = {
    "블로그 글쓰기": {
      "친근한": `너는 따뜻하고 대화하듯 글을 쓰는 블로거야.
아래 주제에 대해 블로그 글을 작성해줘.

📌 출력 형식:
- 제목
- 서론 / 본론 / 결론 (총 3단락)
- 마지막 문단은 독자에게 질문을 던지는 형식

📌 문체 지시:
말하듯이 편안하고 친근한 어조로 써줘.

📎 출력 방식: 마크다운 형식으로 포맷팅해줘.`
    }
    // 생략된 나머지 템플릿은 앱 내에 포함됨
  };

  const generatePrompt = () => {
    const goalTemplate = templates[goal];
    const selected = goalTemplate?.[style] ?? Object.values(goalTemplate ?? {})[0] ?? '해당 조합의 프롬프트가 준비되지 않았습니다.';
    setPrompt(selected);
  };

  return (
    <div className="p-6 max-w-2xl mx-auto space-y-6">
      <h2 className="text-2xl font-bold">🎯 AI 프롬프트 추천기</h2>

      <Card>
        <CardContent className="space-y-4 pt-6">
          <Select onValueChange={setGoal} defaultValue={goal}>
            <SelectTrigger>
              <SelectValue placeholder="창작 목적 선택" />
            </SelectTrigger>
            <SelectContent>
              {Object.keys(templates).map((key) => (
                <SelectItem key={key} value={key}>{key}</SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select onValueChange={setStyle} defaultValue={style}>
            <SelectTrigger>
              <SelectValue placeholder="스타일 선택" />
            </SelectTrigger>
            <SelectContent>
              {Object.keys(templates[goal]).map((key) => (
                <SelectItem key={key} value={key}>{key}</SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Button onClick={generatePrompt}>🔍 프롬프트 추천</Button>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="pt-6">
          <Textarea value={prompt} rows={14} readOnly className="w-full" />
        </CardContent>
      </Card>
    </div>
  );
}
