import { useEffect } from "react";

/**
 * ElevenLabs AI Voice Agent Widget
 * Integration for Schoolars Hub
 */
const VoiceAgent = () => {
  useEffect(() => {
    // Add the ElevenLabs widget script dynamically
    const script = document.createElement("script");
    script.src = "https://elevenlabs.io/convai-widget/index.js";
    script.async = true;
    script.type = "text/javascript";
    document.body.appendChild(script);

    return () => {
      // Cleanup script on unmount if necessary
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

  return (
    <div className="voice-agent-container">
      {/* 
        Custom element for ElevenLabs Conversational AI 
        Agent ID: agent_7801kpha4bnee6k8032z1hajk639
      */}
      <elevenlabs-convai agent-id="agent_7801kpha4bnee6k8032z1hajk639"></elevenlabs-convai>
    </div>
  );
};

export default VoiceAgent;
