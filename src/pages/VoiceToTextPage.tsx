import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Mic } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

const VoiceToTextPage: React.FC = () => {

  const {
    transcript,
    listening,
    browserSupportsSpeechRecognition,
    resetTranscript,
    finalTranscript,
  } = useSpeechRecognition();

  const [text, setText] = useState('');

  console.log(finalTranscript);

  const handleStartListening = () => {
    resetTranscript();
    SpeechRecognition.startListening({ language: 'ru-RU', continuous: true });
  };

  useEffect(() => {
    setText(transcript);
  }, [transcript]);

  if (!browserSupportsSpeechRecognition) {
    return <span>Браузер не поддерживает распознавание речи!</span>;
  }

  return (
    <div>
      <p>Микрофон: {listening ? 'включён' : 'выключен'}</p>
      <p>{transcript}</p>
      <Textarea value={text} onChange={(e) => setText(e.target.value)} />
      <div className='flex gap-3'>
        <Button disabled={listening} onClick={handleStartListening}>
          <Mic />
          Старт
        </Button>
        {listening && (
          <Button variant={'destructive'} onClick={SpeechRecognition.stopListening}>
            Стоп
          </Button>
        )}
      </div>
    </div>
  );
};
export default VoiceToTextPage;
