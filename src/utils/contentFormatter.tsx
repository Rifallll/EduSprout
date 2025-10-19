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
  // Handle standalone URLs that are not already part of a markdown link
  formattedText = formattedText.replace(/(?<!href=")(https?:\/\/[^\s]+)/g, '<a href="$1" target="_blank" rel="noopener noreferrer" class="text-primary hover:underline">$1</a>');
  return formattedText;
};

export const formatScholarshipContent = (content: string | undefined) => {
  if (!content) return null;

  let rawLines = content.split('\n');
  const processedLines: string[] = [];

  // Define patterns that mark the start of the unwanted footer section
  const footerStartPatterns = [
    "Bagikan ke temanmu 🙂",
    "Share",
    "Click to print (Opens in new window)",
    "Like this:",
    "Loading...",
    "Related",
    "Kamu akan dibantu:", // Specific call to action list
    "Ingin Didampingi Sampai Lolos Beasiswa?",
    "Siap Dibimbing Menuju Beasiswa Jepang?",
    "Butuh Pendampingan Sebelum Daftar?",
    "Siap Melangkah Lebih Jauh?",
    "Masih Bingung Milih Beasiswa?",
    "Siap Bimbingan Beasiswa Langsung dari Mentor Beasiswa.id?",
    "Siap Dibimbing Langsung oleh Mentor Beasiswa.id?",
    "Butuh Bantuan Persiapan Beasiswa?",
    "🔍 Ingin Serius Daftar Beasiswa? Jangan Berjuang Sendiri!",
    "🎓 Butuh Pendampingan?",
    "🚀 Klik di sini untuk mulai didampingi →",
    "👉 Klik di sini untuk mulai konsultasi →",
    "👉 Klik di sini untuk daftar sesi konsultasi bareng mentor",
    "👉 Klik untuk Konsultasi Sekarang",
    "👉 Daftar Pendampingan Beasiswa Sekarang",
    "👉 Lynk Konsultasi Beasiswa",
    "👉 Yuk, mulai dari sekarang dan pastikan kamu nggak ketinggalan beasiswa ke Jepang tahun depan!",
    "Gabung juga di Channel Telegram INDBeasiswa [UPDATE SETIAP HARI]:",
    "Channel WhatsApp INDBeasiswa:",
    "Instagram:",
    "Official Facebook Page:",
  ];

  let footerFound = false;
  for (const line of rawLines) {
    const trimmedLine = line.trim();
    if (footerStartPatterns.some(pattern => trimmedLine.startsWith(pattern))) {
      footerFound = true;
      break; // Stop processing lines once a footer pattern is found
    }
    processedLines.push(line);
  }

  const lines = processedLines.map(line => line.trim());
  const elements: JSX.Element[] = [];
  let currentList: string[] = [];
  let listType: 'ul' | 'ol' | null = null;
  let currentParagraph: string[] = [];

  const renderParagraph = () => {
    if (currentParagraph.length > 0) {
      elements.push(
        <p key={`p-${elements.length}`} className="mb-4 text-base text-foreground leading-relaxed" dangerouslySetInnerHTML={{ __html: formatText(currentParagraph.join(' ')) }} />
      );
      currentParagraph = [];
    }
  };

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
    }
  };

  lines.forEach((line, index) => {
    // Skip empty lines, but allow them to break paragraphs/lists
    if (line === '') {
      renderParagraph();
      renderList();
      return;
    }

    // --- Heading Detection ---
    // H2: Major sections, often standalone, title case, relatively short.
    // Example: "Persyaratan Beasiswa", "Pendaftaran Beasiswa", "Jadwal Seleksi Beasiswa"
    const isH2 = line.length > 0 && line.length < 50 &&
                 line.match(/^[A-Z][a-zA-Z0-9\s&]+$/) &&
                 !line.includes(':') && // Exclude "Baca Juga:"
                 !line.match(/^\d+\./); // Exclude numbered items

    // H3: Sub-sections, can be numbered or a phrase, might end with a colon.
    // Example: "1. Informasi yang Kami Kumpulkan", "Keamanan Data", "Tips:"
    const isH3 = !isH2 && line.length > 0 && line.length < 80 &&
                 (line.match(/^(\d+\.\s+)?([A-Z][a-zA-Z0-9\s&]+:?)$/) || line.match(/^[A-Z][a-zA-Z0-9\s&]+:$/));

    // H4: Smaller points or titles, often starts with an icon or is very short.
    // Example: "💡 1. Siapkan Dokumen dari Jauh-Jauh Hari", "Manfaat:"
    const isH4 = !isH2 && !isH3 && line.length > 0 && line.length < 100 &&
                 line.match(/^(✅|💡|📌|🎓|✨|✔️|📝|💬|📚|💼|🧠|🔁|🎯|🚀|🌟|🔥|📣|🤔|💰|👥|⏰|🏠|❤️|⬆️|🤝|🏆)?\s*([A-Z][a-zA-Z0-9\s&]+):?$/);

    // --- Special Patterns ---
    const isBacaJuga = line.startsWith("Baca Juga:");
    const isKontak = line.startsWith("Kontak:");

    if (isH2 || isH3 || isH4 || isBacaJuga || isKontak) {
      renderParagraph(); // Render any pending paragraph
      renderList();     // Render any pending list

      if (isH2) {
        elements.push(
          <h2 key={`h2-${elements.length}`} className="text-2xl md:text-3xl font-bold mt-8 mb-4 text-foreground" dangerouslySetInnerHTML={{ __html: formatText(line) }} />
        );
      } else if (isH3) {
        elements.push(
          <h3 key={`h3-${elements.length}`} className="text-xl md:text-2xl font-bold mt-6 mb-3 text-foreground" dangerouslySetInnerHTML={{ __html: formatText(line) }} />
        );
      } else if (isH4) {
        elements.push(
          <h4 key={`h4-${elements.length}`} className="text-lg font-semibold mt-4 mb-2 text-foreground" dangerouslySetInnerHTML={{ __html: formatText(line) }} />
        );
      } else if (isBacaJuga) {
        elements.push(
          <p key={`bacajuga-${elements.length}`} className="mb-4 text-base text-muted-foreground italic" dangerouslySetInnerHTML={{ __html: formatText(line) }} />
        );
      } else if (isKontak) {
        elements.push(
          <p key={`kontak-${elements.length}`} className="mb-2 text-base font-semibold text-foreground" dangerouslySetInnerHTML={{ __html: formatText(line) }} />
        );
      }
    }
    // --- List Item Detection ---
    else if (line.match(/^(✅|💡|📌|🎓|✨|✔️|📝|💬|📚|💼|🧠|🔁|🎯|🚀|🌟|🔥|📣|🤔|💰|👥|⏰|🏠|❤️|⬆️|🤝|🏆|\*|-)\s*(.*)/)) {
      renderParagraph(); // Render any pending paragraph
      if (listType !== 'ul' && currentList.length > 0) {
        renderList(); // Render previous list if type changed
      }
      listType = 'ul';
      currentList.push(line);
    }
    else if (line.match(/^\d+\.\s*(.*)/)) {
      renderParagraph(); // Render any pending paragraph
      if (listType !== 'ol' && currentList.length > 0) {
        renderList(); // Render previous list if type changed
      }
      listType = 'ol';
      currentList.push(line);
    }
    // --- Regular Paragraph ---
    else {
      renderList(); // Render any pending list
      currentParagraph.push(line); // Add to current paragraph buffer
    }
  });

  renderParagraph(); // Render any remaining paragraph
  renderList();     // Render any remaining list items

  return <>{elements}</>;
};