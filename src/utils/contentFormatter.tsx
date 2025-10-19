import React from 'react';
import { CheckCircle, Lightbulb, MapPin, GraduationCap, Star, BookOpen, MessageCircleQuestion, DollarSign, Users, Briefcase, Clock, Home, TrendingUp, Heart, Upload, Handshake, Megaphone, Award, Plane, Zap } from 'lucide-react';

// Map common prefixes to Lucide icons
const iconMap: { [key: string]: React.ElementType } = {
  '✅': CheckCircle,
  '💡': Lightbulb,
  '📌': MapPin, // Using MapPin for general "point"
  '🎓': GraduationCap,
  '✨': Star,
  '✔️': CheckCircle,
  '📝': BookOpen,
  '💬': MessageCircleQuestion,
  '📚': BookOpen,
  '💼': Briefcase,
  '🧠': Lightbulb,
  '🔁': TrendingUp,
  '🎯': Star,
  '🚀': Plane,
  '🌟': Star,
  '🔥': Zap, // Assuming Zap for 'HOT' or 'fire'
  '📣': Megaphone,
  '🤔': MessageCircleQuestion,
  '💰': DollarSign,
  '👥': Users,
  '⏰': Clock,
  '🏠': Home,
  '❤️': Heart,
  '⬆️': Upload,
  '🤝': Handshake,
  '🏆': Award,
};

const formatText = (text: string) => {
  // Handle bold: **text** or __text__
  let formattedText = text.replace(/\*\*(.*?)\*\*|__(.*?)__/g, '<strong>$1$2</strong>');
  // Handle italic: *text* or _text_
  formattedText = formattedText.replace(/\*(.*?)\*|_(.*?)_/g, '<em>$1$2</em>');
  return formattedText;
};

export const formatScholarshipContent = (content: string | undefined) => {
  if (!content) return null;

  const lines = content.split('\n').filter(line => line.trim() !== '');
  const elements: JSX.Element[] = [];
  let currentList: string[] = [];
  let listType: 'ul' | 'ol' | null = null;
  let olCounter = 0;

  const renderList = () => {
    if (currentList.length > 0) {
      if (listType === 'ul') {
        elements.push(
          <ul key={`ul-${elements.length}`} className="list-none space-y-2 pl-0 mb-4">
            {currentList.map((item, idx) => {
              const iconMatch = item.match(/^(✅|💡|📌|🎓|✨|✔️|📝|💬|📚|💼|🧠|🔁|🎯|🚀|🌟|🔥|📣|🤔|💰|👥|⏰|🏠|❤️|⬆️|🤝|🏆)\s*(.*)/);
              const IconComponent = iconMatch ? iconMap[iconMatch[1]] : null;
              const itemText = iconMatch ? iconMatch[2].trim() : item.trim();
              return (
                <li key={idx} className="flex items-start text-base text-foreground">
                  {IconComponent ? <IconComponent className="h-5 w-5 text-primary mr-2 mt-1 flex-shrink-0" /> : <span className="mr-2 text-primary">•</span>}
                  <span dangerouslySetInnerHTML={{ __html: formatText(itemText) }} />
                </li>
              );
            })}
          </ul>
        );
      } else if (listType === 'ol') {
        elements.push(
          <ol key={`ol-${elements.length}`} className="list-decimal list-inside space-y-2 pl-4 mb-4 text-base text-foreground">
            {currentList.map((item, idx) => (
              <li key={idx} dangerouslySetInnerHTML={{ __html: formatText(item.replace(/^\d+\.\s*/, '')) }} />
            ))}
          </ol>
        );
      }
      currentList = [];
      listType = null;
      olCounter = 0;
    }
  };

  lines.forEach((line, index) => {
    const trimmedLine = line.trim();

    // Check for headings (h3 for main sections, h4 for sub-sections)
    const isH3 = trimmedLine.match(/^(\d+\.\s+)?([A-Z][a-zA-Z0-9\s&]+)$/) && trimmedLine.length < 60; // e.g., "1. Informasi yang Kami Kumpulkan" or "Keamanan Data"
    const isH4 = trimmedLine.match(/^(💡|📌|🎓|✨|✔️|📝|💬|📚|💼|🧠|🔁|🎯|🚀|🌟|🔥|📣|🤔|💰|👥|⏰|🏠|❤️|⬆️|🤝|🏆)?\s*([A-Z][a-zA-Z0-9\s&]+):?$/) && trimmedLine.length < 80 && !isH3; // e.g., "Tips:" or "Manfaat:"

    if (isH3) {
      renderList();
      elements.push(
        <h3 key={`h3-${index}`} className="text-2xl font-bold mt-6 mb-3 text-foreground" dangerouslySetInnerHTML={{ __html: formatText(trimmedLine) }} />
      );
    } else if (isH4) {
      renderList();
      elements.push(
        <h4 key={`h4-${index}`} className="text-xl font-semibold mt-5 mb-2 text-foreground" dangerouslySetInnerHTML={{ __html: formatText(trimmedLine) }} />
      );
    }
    // Check for unordered list items (starting with specific icons or bullet points)
    else if (trimmedLine.match(/^(✅|💡|📌|🎓|✨|✔️|📝|💬|📚|💼|🧠|🔁|🎯|🚀|🌟|🔥|📣|🤔|💰|👥|⏰|🏠|❤️|⬆️|🤝|🏆|\*|-)\s*(.*)/)) {
      if (listType !== 'ul' && currentList.length > 0) {
        renderList();
      }
      listType = 'ul';
      currentList.push(trimmedLine);
    }
    // Check for ordered list items (starting with numbers)
    else if (trimmedLine.match(/^\d+\.\s*(.*)/)) {
      if (listType !== 'ol' && currentList.length > 0) {
        renderList();
      }
      listType = 'ol';
      currentList.push(trimmedLine);
      olCounter++;
    }
    // Regular paragraph
    else {
      renderList();
      if (trimmedLine) {
        elements.push(
          <p key={`p-${index}`} className="mb-4 text-base text-foreground leading-relaxed" dangerouslySetInnerHTML={{ __html: formatText(trimmedLine) }} />
        );
      }
    }
  });

  renderList(); // Render any remaining list items

  return <>{elements}</>;
};