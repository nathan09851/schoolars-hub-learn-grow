import { useEffect, useRef, useState } from "react";

/**
 * ElevenLabs AI Voice Agent Widget — deferred load
 *
 * WHY: The ElevenLabs script is a ~340 KB bundle that executes a long main-thread
 * task on load. On a Moto G Power (mobile benchmark CPU), this inflates TBT by
 * ~390 ms. We defer it until the page is fully interactive using requestIdleCallback,
 * with a 3-second timeout fallback.
 *
 * On first user interaction (touchstart / click / keydown), we also load immediately
 * so the widget is always available before the user actually wants to talk.
 */
const VoiceAgent = () => {
  const [widgetReady, setWidgetReady] = useState(false);
  const loaded = useRef(false);

  const loadWidget = () => {
    if (loaded.current) return;
    loaded.current = true;

    const script = document.createElement("script");
    script.src = "https://unpkg.com/@elevenlabs/convai-widget-embed";
    script.async = true;
    script.type = "text/javascript";
    script.onload = () => setWidgetReady(true);
    document.body.appendChild(script);
  };

  useEffect(() => {
    // Strategy 1: Load after user's first meaningful interaction
    const events = ["touchstart", "mousedown", "keydown", "scroll"] as const;
    const onInteraction = () => {
      loadWidget();
      events.forEach((e) => window.removeEventListener(e, onInteraction));
    };
    events.forEach((e) => window.addEventListener(e, onInteraction, { passive: true, once: true }));

    // Strategy 2: Load during idle time (max 4 s after page load)
    let idleCb: ReturnType<typeof requestIdleCallback> | null = null;
    if ("requestIdleCallback" in window) {
      idleCb = requestIdleCallback(loadWidget, { timeout: 4000 });
    } else {
      // Fallback for Safari — load 3 s after page ready
      const t = setTimeout(loadWidget, 3000);
      return () => {
        clearTimeout(t);
        events.forEach((e) => window.removeEventListener(e, onInteraction));
      };
    }

    return () => {
      if (idleCb !== null) cancelIdleCallback(idleCb);
      events.forEach((e) => window.removeEventListener(e, onInteraction));
    };
  }, []);

  // Only mount the custom element after the script is loaded to avoid
  // a FOUC (flash of undefined content / unregistered element)
  if (!widgetReady) return null;

  return (
    <elevenlabs-convai agent-id="agent_7801kpha4bnee6k8032z1hajk639" />
  );
};

export default VoiceAgent;
