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

  // Patterns to identify and remove common introductory/footer boilerplate
  const boilerplatePatterns = [
    // Introductory patterns (regex for flexibility)
    /^INDBeasiswa\.com –/,
    /^Info beasiswa dalam negeri kali ini datang dari Beasiswa YBM BRILiaN\. Di tahun \d{4} ini,/,
    /^YBM BRILiaN Smart Scholarship membuka peluang beasiswa bagi mahasiswa semester 1 jenjang D3\/D4\/S1 dari seluruh perguruan tinggi di Indonesia\. Berikut informasi selengkapnya\./,
    /^Daftar Isi/,
    /^Beasiswa YBM BRILiaN Smart Scholarship Tahun \d{4}/, // Specific title repetition
    /^Pernah bermimpi kuliah di Jepang\? Negeri sakura ini bukan cuma menawarkan teknologi canggih dan budaya yang kaya, tapi juga peluang pendidikan tinggi yang terbuka luas — terutama melalui program beasiswa\./,
    /^Kabar baiknya, jenis beasiswa kuliah di Jepang sangat beragam\. Ada yang diberikan langsung oleh pemerintah Jepang, universitas, hingga organisasi swasta\. Bahkan banyak di antaranya bersifat fully funded alias dibiayai penuh !/,
    /^Nah, sebelum kamu bingung pilih yang mana, yuk simak ulasan lengkap tentang jenis-jenis beasiswa kuliah di Jepang yang bisa kamu incar sesuai minat dan latar belakangmu\./,
    /^Kuliah di Jepang jadi impian banyak pelajar Indonesia\. Bukan cuma karena kualitas pendidikannya yang masuk 10 besar dunia, tapi juga karena banyak beasiswa tersedia untuk berbagai jenjang dan bidang studi\./,
    /^Mulai dari S1, S2, hingga riset akademik, Jepang menyediakan banyak program beasiswa — baik dari pemerintah, universitas, hingga swasta\./,
    /^Kalau kamu sudah baca jenis-jenis beasiswanya, sekarang waktunya kamu kenalan dengan daftar beasiswa kuliah di Jepang yang paling populer dan bisa kamu daftar\. Yuk simak sampai akhir!/,
    /^Bermimpi kuliah di Jepang\? Jangan cuma mimpi! Jepang tidak hanya punya sistem pendidikan yang kuat, tetapi juga banyak beasiswa yang bisa kamu raih\. Tapi… semua itu hanya mungkin kalau kamu siap bersaing\./,
    /^Artikel ini akan membahas tips-tips penting mempersiapkan diri sebelum mendaftar beasiswa kuliah ke Jepang\. Dari akademik hingga dokumen penting — semua dibahas lengkap\. Baca sampai akhir, ya!/,
    /^Kamu Merasa Salah Pilih Beasiswa\? Ini yang Perlu Kamu Lakukan!/,
    /^Banyak pelajar bermimpi bisa kuliah ke luar negeri lewat jalur beasiswa\. Tapi, bagaimana kalau ternyata beasiswa yang kamu dapatkan tidak sesuai harapan\?/,
    /^Tenang\. Rasa kecewa itu wajar, tapi jangan buru-buru menyerah\./,
    /^Berikut langkah-langkah yang bisa kamu ambil agar tetap berada di jalur yang benar\:/,
    /^Ingin Dapat Beasiswa Tapi Bingung Mulai dari Mana\?/,
    /^Banyak pelajar Indonesia bermimpi kuliah dengan beasiswa\. Tapi, kebanyakan hanya fokus pada beasiswa yang sudah umum, padahal ada banyak beasiswa yang jarang diketahui tapi punya peluang besar untuk didapatkan\./,
    /^Nah, berikut ini 5 beasiswa yang mungkin belum banyak kamu dengar, tapi bisa jadi jalan emas untuk mewujudkan impian kuliahmu—baik di dalam negeri maupun luar negeri\. Yuk, simak sampai tuntas!/,
    /^Bingung Kapan Waktu Ideal Daftar Beasiswa\? Ini Panduan Wajib Kamu Baca!/,
    /^Banyak calon penerima beasiswa gagal bukan karena tidak memenuhi syarat, tapi karena telat daftar atau kurang persiapan sejak awal\. Kamu tidak ingin jadi salah satunya, kan\?/,
    /^Yuk, simak 5 tips menentukan waktu terbaik untuk mendaftar beasiswa berikut ini agar tidak kehilangan kesempatan emas!/,
    /^“Pilih beasiswa dari pemerintah atau swasta\? Yuk, simak perbedaannya dan pilih yang cocok buat kamu!”/,
    /^Saat mencari beasiswa, kamu pasti sering dihadapkan pada dua pilihan besar: beasiswa dari pemerintah atau beasiswa dari lembaga swasta\. Kedua jenis ini menawarkan banyak keuntungan, tapi tentu saja, masing-masing punya karakteristik dan keunggulan tersendiri\./,
    /^Yuk, kita bahas satu per satu!/,
    /^“Mau dapetin beasiswa buat kuliah di bidang kreatif\? Yuk, simak apa aja yang harus kamu siapin!”/,
    /^Beasiswa di bidang kreatif sering dianggap langka atau sulit ditemukan\. Padahal, saat ini banyak lembaga dan universitas di dalam maupun luar negeri yang menawarkan beasiswa bagi pelajar yang memiliki potensi di bidang seni dan kreativitas\./,
    /^Kalau kamu adalah siswa yang aktif di dunia desain, musik, film, arsitektur, media sosial, atau fotografi, ini adalah saat yang tepat buat memulai langkah serius menuju beasiswa!/,
    /^“Bingung pilih beasiswa yang full funded atau partially funded\? Yuk, simak perbedaannya dan cari tahu mana yang cocok buat kamu!”/,
    /^Saat ingin melanjutkan studi ke luar negeri, satu hal penting yang harus kamu tentukan sejak awal adalah jenis beasiswa yang ingin kamu incar\. Apakah kamu ingin mencari beasiswa full funded yang menanggung semua kebutuhan\? Atau kamu fleksibel dengan partially funded yang hanya menanggung sebagian\?/,
    /^Nah, supaya kamu bisa membuat keputusan yang bijak, simak penjelasan berikut ini!/,
    // Footer patterns (regex for flexibility)
    /^Bagikan ke temanmu 🙂/, /^Share/, /^Click to print \(Opens in new window\)/, /^Print/,
    /^Click to share on Facebook \(Opens in new window\)/, /^Facebook/,
    /^Click to share on LinkedIn \(Opens in new window\)/, /^LinkedIn/,
    /^Click to share on Reddit \(Opens in new window\)/, /^Reddit/,
    /^Click to share on X \(Opens in new window\)/, /^X/,
    /^Click to share on Telegram \(Opens in new window\)/, /^Telegram/,
    /^Click to share on WhatsApp \(Opens in new window\)/, /^WhatsApp/,
    /^Like this:/, /^Like/, /^Loading\.\.\./, /^Related/,
    /^Kamu akan dibantu:/, /^Ingin Didampingi Sampai Lolos Beasiswa\?/,
    /^Siap Dibimbing Menuju Beasiswa Jepang\?/, /^Butuh Pendampingan Sebelum Daftar\?/,
    /^Siap Melangkah Lebih Jauh\?/, /^Masih Bingung Milih Beasiswa\?/,
    /^Siap Bimbingan Beasiswa Langsung dari Mentor Beasiswa\.id\?/,
    /^Siap Dibimbing Langsung oleh Mentor Beasiswa\.id\?/,
    /^Butuh Bantuan Persiapan Beasiswa\?/,
    /^🔍 Ingin Serius Daftar Beasiswa\? Jangan Berjuang Sendiri!/,
    /^🎓 Butuh Pendampingan\?/, /^🚀 Klik di sini untuk mulai didampingi →/,
    /^👉 Klik di sini untuk mulai konsultasi →/,
    /^👉 Klik di sini untuk daftar sesi konsultasi bareng mentor/,
    /^👉 Klik untuk Konsultasi Sekarang/, /^👉 Daftar Pendampingan Beasiswa Sekarang/,
    /^👉 Lynk Konsultasi Beasiswa/,
    /^👉 Yuk, mulai dari sekarang dan pastikan kamu nggak ketinggalan beasiswa ke Jepang tahun depan!/,
    /^Gabung juga di Channel Telegram INDBeasiswa \[UPDATE SETIAP HARI\]:/,
    /^Channel WhatsApp INDBeasiswa:/, /^Instagram:/, /^Official Facebook Page:/,
    /^Sumber Informasi Resmi:/, /^Sumber Website Resmi:/, /^Kontak:/, /^Silakan dibagikan pada teman-teman yang membutuhkan\. Semoga bermanfaat\./,
    /^Silakan bagikan pada teman dan keluarga yang membutuhkan\. Semoga bermanfaat\./,
    /^Silakan bagikan pada rekan-rekan yang membutuhkan\. Selamat mencoba dan semoga bermanfaat\./,
    /^Untuk informasi lebih lanjut dan pendaftaran, silakan kunjungi tautan resmi beasiswa\./,
    /^Baca Juga:/, /^Baca Juga/
  ];

  let startIndex = 0;
  // Skip introductory boilerplate from the beginning
  while (startIndex < rawLines.length) {
    const line = rawLines[startIndex].trim();
    const isBoilerplate = boilerplatePatterns.some(pattern => pattern.test(line));

    if (isBoilerplate || line === '') {
      startIndex++;
    } else {
      break;
    }
  }

  let endIndex = rawLines.length;
  // Trim footer boilerplate from the end
  while (endIndex > startIndex) {
    const line = rawLines[endIndex - 1].trim();
    const isBoilerplate = boilerplatePatterns.some(pattern => pattern.test(line));

    if (isBoilerplate || line === '') {
      endIndex--;
    } else {
      break;
    }
  }

  const lines = rawLines.slice(startIndex, endIndex).map(line => line.trim());
  const elements: JSX.Element[] = [];
  let currentList: string[] = [];
  let listType: 'ul' | 'ol' | null = null;
  let currentParagraph: string[] = [];

  const renderParagraph = () => {
    if (currentParagraph.length > 0) {
      const paragraphText = currentParagraph.join(' ').trim();
      if (paragraphText) { // Only render if there's actual text
        elements.push(
          <p key={`p-${elements.length}`} className="mb-4 text-base text-foreground leading-relaxed" dangerouslySetInnerHTML={{ __html: formatText(paragraphText) }} />
        );
      }
      currentParagraph = [];
    }
  };

  const renderList = () => {
    if (currentList.length > 0) {
      if (listType === 'ul') {
        elements.push(
          <ul key={`ul-${elements.length}`} className="list-none space-y-3 pl-0 mb-4">
            {currentList.map((item, idx) => {
              const iconMatch = item.match(/^(✅|💡|📌|🎓|✨|✔️|📝|💬|📚|💼|🧠|🔁|🎯|🚀|🌟|🔥|📣|🤔|💰|👥|⏰|🏠|❤️|⬆️|🤝|🏆|\*|-)\s*(.*)/);
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
          <ol key={`ol-${elements.length}`} className="list-decimal list-inside space-y-3 pl-4 mb-4 text-base text-foreground">
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
    // H2: All uppercase, or starts with "Daftar Isi", "CAKUPAN BEASISWA", "PERSYARATAN", "CARA MENDAFTAR", "KONTAK"
    const isH2 = line.length > 0 && (
      line.toUpperCase() === line || // All caps
      line.startsWith("Daftar Isi") ||
      line.startsWith("CAKUPAN BEASISWA") ||
      line.startsWith("PERSYARATAN BEASISWA") ||
      line.startsWith("BERKAS DOKUMEN") ||
      line.startsWith("CARA MENDAFTAR BEASISWA") ||
      line.startsWith("KONTAK") ||
      line.startsWith("TIMELINE")
    );

    // H3: Title case, often program names or questions, or starts with "APA ITU"
    const isH3 = !isH2 && line.length > 0 && (
      line.startsWith("APA ITU") ||
      line.startsWith("Beasiswa YBM BRILiaN Smart Scholarship Tahun") ||
      line.startsWith("Beasiswa DataPrint") ||
      line.startsWith("Bantuan Kuliah S1 – S3") ||
      line.startsWith("Beasiswa ORBIT Yogyakarta") ||
      line.startsWith("Beasiswa Aktivis Nusantara") ||
      line.startsWith("Skema Bantuan Kuliah S1 – S3") ||
      line.startsWith("Cakupan Bantuan Kuliah S1 – S3") ||
      line.startsWith("Sasaran Bantuan Kuliah S1 – S3") ||
      line.startsWith("Penyaluran") ||
      line.startsWith("Persyaratan") ||
      line.startsWith("Berkas dokumen yang dibutuhkan") ||
      line.startsWith("Cara Mendaftar") ||
      line.startsWith("Timeline Pendaftaran") ||
      line.startsWith("Kontak") ||
      line.startsWith("Apa itu") || // General "Apa itu..."
      line.startsWith("FASILITAS YANG AKAN DIDAPATKAN") ||
      line.startsWith("MITRA KAMPUS BAKTI NUSA") ||
      line.startsWith("PERSYARATAN UMUM") ||
      line.startsWith("BERKAS DOKUMEN YANG DIBUTUHKAN") ||
      line.startsWith("CARA MENDAFTAR") ||
      line.startsWith("TIMELINE DAN TAHAPAN SELEKSI") ||
      line.startsWith("KETENTUAN UMUM") ||
      line.startsWith("KETENTUAN KHUSUS") ||
      line.startsWith("CATATAN YANG PERLU DIPERHATIKAN")
    );

    // H4: Smaller points or titles, often starts with an icon or is very short.
    const isH4 = !isH2 && !isH3 && line.length > 0 && line.length < 100 &&
                 line.match(/^(✅|💡|📌|🎓|✨|✔️|📝|💬|📚|💼|🧠|🔁|🎯|🚀|🌟|🔥|📣|🤔|💰|👥|⏰|🏠|❤️|⬆️|🤝|🏆)?\s*([A-Z][a-zA-Z0-9\s&]+):?$/);

    // --- Special Patterns ---
    const isBacaJuga = line.startsWith("Baca Juga:");

    if (isH2 || isH3 || isH4 || isBacaJuga) {
      renderParagraph(); // Render any pending paragraph
      renderList();     // Render any pending list

      if (isH2) {
        elements.push(
          <h2 key={`h2-${elements.length}`} className="text-2xl md:text-3xl font-bold mt-8 mb-6 text-foreground leading-tight" dangerouslySetInnerHTML={{ __html: formatText(line) }} />
        );
      } else if (isH3) {
        elements.push(
          <h3 key={`h3-${elements.length}`} className="text-xl md:text-2xl font-bold mt-6 mb-4 text-foreground leading-snug" dangerouslySetInnerHTML={{ __html: formatText(line) }} />
        );
      } else if (isH4) {
        elements.push(
          <h4 key={`h4-${elements.length}`} className="text-lg font-semibold mt-4 mb-3 text-foreground" dangerouslySetInnerHTML={{ __html: formatText(line) }} />
        );
      } else if (isBacaJuga) {
        elements.push(
          <p key={`bacajuga-${elements.length}`} className="mb-4 text-base text-muted-foreground italic" dangerouslySetInnerHTML={{ __html: formatText(line) }} />
        );
      }
    }
    // --- List Item Detection ---
    // Improved list detection: lines starting with icons, bullets, or numbers
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
    // Special handling for implicit list items under certain headings (e.g., "CAKUPAN BEASISWA")
    else if (
      (elements.length > 0 && (elements[elements.length - 1].key?.toString().includes('h2') || elements[elements.length - 1].key?.toString().includes('h3'))) &&
      (
        elements[elements.length - 1].props.dangerouslySetInnerHTML.__html.includes("CAKUPAN BEASISWA") ||
        elements[elements.length - 1].props.dangerouslySetInnerHTML.__html.includes("PERSYARATAN") ||
        elements[elements.length - 1].props.dangerouslySetInnerHTML.__html.includes("BERKAS DOKUMEN") ||
        elements[elements.length - 1].props.dangerouslySetInnerHTML.__html.includes("FASILITAS YANG AKAN DIDAPATKAN")
      ) &&
      line.length > 0 && !line.startsWith("INDBeasiswa.com") && !line.startsWith("Daftar Isi") && !line.startsWith("Beasiswa YBM BRILiaN Smart Scholarship Tahun")
    ) {
      renderParagraph(); // Render any pending paragraph
      if (listType !== 'ul' && currentList.length > 0) {
        renderList();
      }
      listType = 'ul';
      // Split by common list item delimiters if it's a long line
      const potentialListItems = line.split(/;\s*(?=[A-Z])|\.\s*(?=[A-Z])/).filter(item => item.trim() !== '');
      if (potentialListItems.length > 1) {
        currentList.push(...potentialListItems);
      } else {
        currentList.push(line);
      }
    }
    // --- Regular Paragraph ---
    else {
      renderList();
      currentParagraph.push(line);
    }
  });

  renderParagraph();
  renderList();

  return <>{elements}</>;
};