import React from 'react';
import { CheckCircle, Lightbulb, MapPin, GraduationCap, Star, BookOpen, MessageCircleQuestion, DollarSign, Users, Briefcase, Clock, Home, TrendingUp, Heart, Upload, Handshake, Megaphone, Award, Plane, Zap } from 'lucide-react';

// Map common prefixes to Lucide icons
const iconMap: { [key: string]: React.ElementType } = {
  '✅': CheckCircle,
  '💡': Lightbulb,
  '📌': MapPin,
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
  '🔥': Zap,
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
  // Handle links: [text](url)
  formattedText = formattedText.replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer" class="text-primary hover:underline">$1</a>');
  return formattedText;
};

export const formatScholarshipContent = (content: string | undefined) => {
  if (!content) return null;

  const lines = content.split('\n').map(line => line.trim());
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
    const nextLine = lines[index + 1] || '';
    const prevLine = lines[index - 1] || '';

    // Check for main headings (h2) - often short, bold, and followed by a blank line or paragraph
    const isH2 = line.length > 0 && line.length < 70 &&
                 (line.match(/^[A-Z][a-zA-Z0-9\s&]+$/) || line.match(/^\d+\.\s+[A-Z][a-zA-Z0-9\s&]+$/)) &&
                 (nextLine === '' || nextLine.match(/^(✅|💡|📌|🎓|✨|✔️|📝|💬|📚|💼|🧠|🔁|🎯|🚀|🌟|🔥|📣|🤔|💰|👥|⏰|🏠|❤️|⬆️|🤝|🏆|\*|-|\d+\.)/));

    // Check for sub-headings (h3) - slightly longer, or specific patterns
    const isH3 = !isH2 && line.length > 0 && line.length < 100 &&
                 (line.match(/^[A-Z][a-zA-Z0-9\s&]+:?$/) || line.match(/^\d+\.\s+[A-Z][a-zA-Z0-9\s&]+:?$/)) &&
                 (nextLine === '' || nextLine.match(/^(✅|💡|📌|🎓|✨|✔️|📝|💬|📚|💼|🧠|🔁|🎯|🚀|🌟|🔥|📣|🤔|💰|👥|⏰|🏠|❤️|⬆️|🤝|🏆|\*|-|\d+\.)/));

    // Check for smaller points/titles (h4) - often starts with an icon or is very short
    const isH4 = !isH2 && !isH3 && line.length > 0 && line.length < 80 &&
                 line.match(/^(✅|💡|📌|🎓|✨|✔️|📝|💬|📚|💼|🧠|🔁|🎯|🚀|🌟|🔥|📣|🤔|💰|👥|⏰|🏠|❤️|⬆️|🤝|🏆)?\s*([A-Z][a-zA-Z0-9\s&]+):?$/);


    if (isH2) {
      renderList();
      elements.push(
        <h2 key={`h2-${index}`} className="text-2xl md:text-3xl font-bold mt-8 mb-4 text-foreground" dangerouslySetInnerHTML={{ __html: formatText(line) }} />
      );
    } else if (isH3) {
      renderList();
      elements.push(
        <h3 key={`h3-${index}`} className="text-xl md:text-2xl font-bold mt-6 mb-3 text-foreground" dangerouslySetInnerHTML={{ __html: formatText(line) }} />
      );
    } else if (isH4) {
      renderList();
      elements.push(
        <h4 key={`h4-${index}`} className="text-lg font-semibold mt-4 mb-2 text-foreground" dangerouslySetInnerHTML={{ __html: formatText(line) }} />
      );
    }
    // Check for unordered list items (starting with specific icons or bullet points)
    else if (line.match(/^(✅|💡|📌|🎓|✨|✔️|📝|💬|📚|💼|🧠|🔁|🎯|🚀|🌟|🔥|📣|🤔|💰|👥|⏰|🏠|❤️|⬆️|🤝|🏆|\*|-)\s*(.*)/)) {
      if (listType !== 'ul' && currentList.length > 0) {
        renderList();
      }
      listType = 'ul';
      currentList.push(line);
    }
    // Check for ordered list items (starting with numbers)
    else if (line.match(/^\d+\.\s*(.*)/)) {
      if (listType !== 'ol' && currentList.length > 0) {
        renderList();
      }
      listType = 'ol';
      currentList.push(line);
      olCounter++;
    }
    // Handle blank lines as separators for paragraphs
    else if (line === '') {
      renderList();
      // If the previous element was not a paragraph or list, and this is a blank line,
      // we might want to add some vertical space, but usually, paragraph margins handle this.
      // For now, just ensure lists are rendered.
    }
    // Regular paragraph
    else {
      renderList();
      elements.push(
        <p key={`p-${index}`} className="mb-4 text-base text-foreground leading-relaxed" dangerouslySetInnerHTML={{ __html: formatText(line) }} />
      );
    }
  });

  renderList(); // Render any remaining list items

  return <>{elements}</>;
};