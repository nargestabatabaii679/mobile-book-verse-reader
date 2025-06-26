import { Story } from '@/types';

export const stories: Story[] = [
  {
    id: 'forest-adventure',
    title: 'ماجراجویی در جنگل جادویی',
    description: 'داستانی پر از ماجراجویی در جنگلی اسرارآمیز',
    startBranchId: 'start',
    branches: [
      {
        id: 'start',
        title: 'آغاز ماجراجویی',
        content: 'تو در لبه جنگل جادویی ایستاده‌ای. درختان بلند و انبوه جلوی تو قرار دارند و صدای عجیبی از عمق جنگل می‌آید. دو مسیر جلوی توست.',
        options: [
          {
            id: 'opt1',
            text: 'از مسیر راست که پر از نور است بروم',
            nextBranchId: 'light-path'
          },
          {
            id: 'opt2',
            text: 'از مسیر چپ که تاریک و مرموز است بروم',
            nextBranchId: 'dark-path'
          }
        ]
      },
      {
        id: 'light-path',
        title: 'مسیر نورانی',
        content: 'مسیر نورانی تو را به چمنزار زیبایی می‌رساند. در وسط چمنزار، یک چشمه کریستالی می‌بینی و یک پری زیبا کنار آن نشسته است.',
        options: [
          {
            id: 'opt3',
            text: 'با پری صحبت کنم',
            nextBranchId: 'talk-fairy'
          },
          {
            id: 'opt4',
            text: 'از چشمه آب بنوشم',
            nextBranchId: 'drink-water'
          }
        ]
      },
      {
        id: 'dark-path',
        title: 'مسیر تاریک',
        content: 'مسیر تاریک تو را به غاری عمیق می‌برد. در ورودی غار، صدای غرش اژدهایی می‌شنوی. اما چشمت به گنجینه‌ای در عمق غار می‌افتد.',
        options: [
          {
            id: 'opt5',
            text: 'با شجاعت وارد غار شوم',
            nextBranchId: 'enter-cave'
          },
          {
            id: 'opt6',
            text: 'بازگردم و مسیر دیگر را انتخاب کنم',
            nextBranchId: 'light-path'
          }
        ]
      },
      {
        id: 'talk-fairy',
        title: 'گفتگو با پری',
        content: 'پری لبخند زیبایی می‌زند و می‌گوید: "جوان شجاع، من جادوی ویژه‌ای برای تو دارم. می‌توانی یکی از این دو هدیه را انتخاب کنی."',
        options: [
          {
            id: 'opt7',
            text: 'جادوی پرواز را انتخاب کنم',
            nextBranchId: 'flying-ending'
          },
          {
            id: 'opt8',
            text: 'جادوی درک زبان حیوانات را انتخاب کنم',
            nextBranchId: 'animal-talk-ending'
          }
        ]
      },
      {
        id: 'drink-water',
        title: 'نوشیدن آب جادویی',
        content: 'آب چشمه طعم شیرینی دارد و ناگهان احساس می‌کنی که قدرت فوق‌العاده‌ای در تو جاری شده است.',
        options: [
          {
            id: 'opt9',
            text: 'قدرت جدیدم را امتحان کنم',
            nextBranchId: 'power-ending'
          }
        ]
      },
      {
        id: 'enter-cave',
        title: 'ورود به غار',
        content: 'با شجاعت وارد غار می‌شوی. اژدها که در واقع مهربان است، تو را می‌بیند و می‌گوید: "کسی که این همه شجاعت دارد، شایسته گنجینه من است."',
        options: [
          {
            id: 'opt10',
            text: 'گنجینه را بپذیرم',
            nextBranchId: 'treasure-ending'
          },
          {
            id: 'opt11',
            text: 'به اژدها پیشنهاد دوستی بدهم',
            nextBranchId: 'dragon-friend-ending'
          }
        ]
      },
      {
        id: 'flying-ending',
        title: 'پایان: قدرت پرواز',
        content: 'تو قدرت پرواز را کسب کردی! حالا می‌توانی بر فراز جنگل‌ها و کوه‌ها پرواز کنی و ماجراجویی‌های بی‌پایانی داشته باشی. این آغاز زندگی جدید توست!',
        options: [],
        isEnding: true,
        endingType: 'happy'
      },
      {
        id: 'animal-talk-ending',
        title: 'پایان: زبان حیوانات',
        content: 'حالا می‌توانی با تمام حیوانات صحبت کنی! آن‌ها رازهای جنگل را با تو در میان می‌گذارند و تو به محافظ جنگل تبدیل می‌شوی.',
        options: [],
        isEnding: true,
        endingType: 'happy'
      },
      {
        id: 'power-ending',
        title: 'پایان: قدرت جادویی',
        content: 'آب جادویی به تو قدرت کنترل طبیعت داده است. می‌توانی گل‌ها را شکوفا کنی و طوفان‌ها را آرام کنی. دنیا محل بهتری شده است.',
        options: [],
        isEnding: true,
        endingType: 'happy'
      },
      {
        id: 'treasure-ending',
        title: 'پایان: گنجینه‌یاب',
        content: 'گنجینه‌ای عظیم به دست آوردی! اما مهم‌تر از آن، دوستی اژدها را کسب کردی. حالا تو و اژدها محافظان جنگل هستید.',
        options: [],
        isEnding: true,
        endingType: 'happy'
      },
      {
        id: 'dragon-friend-ending',
        title: 'پایان: دوست اژدها',
        content: 'اژدها بهترین دوست تو شد! شما با هم در جنگل زندگی می‌کنید و از تمام موجودات جنگل محافظت می‌کنید. دوستی واقعی بهترین گنجینه است.',
        options: [],
        isEnding: true,
        endingType: 'happy'
      }
    ]
  },
  {
    id: 'princess-dragon',
    title: 'شاهزاده و اژدهای دوست‌داشتنی',
    description: 'داستان شاهزاده‌ای که اژدهای مهربانی را ملاقات می‌کند',
    startBranchId: 'castle-start',
    branches: [
      {
        id: 'castle-start',
        title: 'شروع در کاخ',
        content: 'تو شاهزاده‌ای هستی که از زندگی کاخ خسته شده‌ای. از پنجره اتاقت اژدهای بزرگی را می‌بینی که روی کوه نشسته و غمگین به نظر می‌رسد.',
        options: [
          {
            id: 'opt1',
            text: 'به ملاقات اژدها بروم',
            nextBranchId: 'meet-dragon'
          },
          {
            id: 'opt2',
            text: 'در کاخ بمانم و محافظان را خبر کنم',
            nextBranchId: 'call-guards'
          }
        ]
      },
      {
        id: 'meet-dragon',
        title: 'ملاقات با اژدها',
        content: 'وقتی به کوه می‌رسی، می‌بینی که اژدها در حال گریه کردن است. او می‌گوید: "همه از من می‌ترسند، اما من فقط می‌خواهم دوست داشته باشم."',
        options: [
          {
            id: 'opt3',
            text: 'به اژدها کمک کنم تا دوست پیدا کند',
            nextBranchId: 'help-dragon'
          },
          {
            id: 'opt4',
            text: 'او را به کاخ دعوت کنم',
            nextBranchId: 'invite-castle'
          }
        ]
      },
      {
        id: 'call-guards',
        title: 'احضار محافظان',
        content: 'محافظان می‌آیند اما وقتی اژدها را می‌بینند، متوجه می‌شوند که او مهربان است. آن‌ها پیشنهاد می‌کنند که با او دوست شوند.',
        options: [
          {
            id: 'opt5',
            text: 'موافقت کنم و همه با هم دوست شویم',
            nextBranchId: 'everyone-friends'
          }
        ]
      },
      {
        id: 'help-dragon',
        title: 'کمک به اژدها',
        content: 'تو به اژدها می‌آموزی که چگونه با مردم دوست شود. او یاد می‌گیرد که لبخند بزند و مهربان باشد.',
        options: [
          {
            id: 'opt6',
            text: 'او را به روستا ببرم تا مردم را ملاقات کند',
            nextBranchId: 'village-visit'
          }
        ]
      },
      {
        id: 'invite-castle',
        title: 'دعوت به کاخ',
        content: 'اژدها خیلی خوشحال می‌شود و قبول می‌کند. در کاخ، همه ابتدا می‌ترسند اما بعد متوجه می‌شوند که او مهربان است.',
        options: [
          {
            id: 'opt7',
            text: 'جشن دوستی برگزار کنم',
            nextBranchId: 'friendship-party'
          }
        ]
      },
      {
        id: 'everyone-friends',
        title: 'پایان: دوستی همگانی',
        content: 'همه با اژدها دوست شدند و حالا او محافظ کاخ است. دنیا محل بهتری شده که در آن همه موجودات با هم دوست هستند.',
        options: [],
        isEnding: true,
        endingType: 'happy'
      },
      {
        id: 'village-visit',
        title: 'پایان: اژدهای محبوب روستا',
        content: 'مردم روستا ابتدا می‌ترسند اما وقتی لطف اژدها را می‌بینند، او را دوست دارند. حالا اژدها کمک‌کار روستا است.',
        options: [],
        isEnding: true,
        endingType: 'happy'
      },
      {
        id: 'friendship-party',
        title: 'پایان: جشن دوستی',
        content: 'جشن بزرگی برگزار می‌شود و همه موجودات جادویی جنگل هم دعوت می‌شوند. این آغاز دوران جدیدی از صلح و دوستی است.',
        options: [],
        isEnding: true,
        endingType: 'happy'
      }
    ]
  },
  {
    id: 'pirate-treasure',
    title: 'گنج دزدان دریایی',
    description: 'در جستجوی گنج گمشده دزدان دریایی',
    startBranchId: 'ship-start',
    branches: [
      {
        id: 'ship-start',
        title: 'روی کشتی دزدان دریایی',
        content: 'تو کاپیتان کشتی دزدان دریایی هستی و نقشه گنج کهنی پیدا کرده‌ای. نقشه نشان می‌دهد که گنج در جزیره‌ای مرموز مخفی شده است.',
        options: [
          {
            id: 'opt1',
            text: 'مستقیم به جزیره بروم',
            nextBranchId: 'sail-island'
          },
          {
            id: 'opt2',
            text: 'ابتدا خدمه بیشتری جمع کنم',
            nextBranchId: 'gather-crew'
          }
        ]
      },
      {
        id: 'sail-island',
        title: 'سفر به جزیره',
        content: 'بعد از چند روز سفر، به جزیره‌ای زیبا با ساحل طلایی می‌رسی. در وسط جزیره، کوه بلندی دیده می‌شود و غاری در دامنه آن قرار دارد.',
        options: [
          {
            id: 'opt3',
            text: 'وارد غار شوم',
            nextBranchId: 'enter-cave'
          },
          {
            id: 'opt4',
            text: 'ابتدا اطراف جزیره را کاوش کنم',
            nextBranchId: 'explore-island'
          }
        ]
      },
      {
        id: 'gather-crew',
        title: 'جمع‌آوری خدمه',
        content: 'خدمه‌ای شجاع و باتجربه جمع می‌کنی. آن‌ها به تو کمک می‌کنند تا سریع‌تر به جزیره برسی و در برابر خطرات محافظت شوی.',
        options: [
          {
            id: 'opt5',
            text: 'با خدمه کامل به جزیره بروم',
            nextBranchId: 'crew-island'
          }
        ]
      },
      {
        id: 'enter-cave',
        title: 'ورود به غار',
        content: 'غار تاریک و پر از تله است. اما با احتیاط جلو می‌روی و در نهایت به اتاقی پر از طلا و جواهر می‌رسی!',
        options: [
          {
            id: 'opt6',
            text: 'گنج را برداشته و سریع فرار کنم',
            nextBranchId: 'quick-escape'
          },
          {
            id: 'opt7',
            text: 'ابتدا ببینم آیا نگهبانی دارد یا نه',
            nextBranchId: 'check-guardian'
          }
        ]
      },
      {
        id: 'explore-island',
        title: 'کاوش جزیره',
        content: 'در کاوش جزیره، قبیله‌ای دوستانه پیدا می‌کنی که می‌گویند گنج متعلق به اجدادشان بوده اما حاضرند آن را با تو تقسیم کنند.',
        options: [
          {
            id: 'opt8',
            text: 'پیشنهادشان را بپذیرم',
            nextBranchId: 'share-treasure'
          },
          {
            id: 'opt9',
            text: 'به تنهایی دنبال گنج بگردم',
            nextBranchId: 'solo-search'
          }
        ]
      },
      {
        id: 'crew-island',
        title: 'ورود با خدمه',
        content: 'با کمک خدمه، سریع گنج را پیدا می‌کنی. آن‌ها در برابر تله‌ها از تو محافظت می‌کنند و همه با هم موفق می‌شوید.',
        options: [
          {
            id: 'opt10',
            text: 'گنج را عادلانه تقسیم کنم',
            nextBranchId: 'fair-share-ending'
          }
        ]
      },
      {
        id: 'quick-escape',
        title: 'پایان: فرار سریع',
        content: 'با گنج فرار می‌کنی اما در راه با مشکلاتی روبه‌رو می‌شوی. در نهایت موفق می‌شوی اما درس می‌گیری که عجله کار شیطان است.',
        options: [],
        isEnding: true,
        endingType: 'neutral'
      },
      {
        id: 'check-guardian',
        title: 'پایان: نگهبان دوستانه',
        content: 'متوجه می‌شوی که نگهبان غار، طوطی پیری است که تنها بوده. او خوشحال می‌شود که کسی او را ملاقات کرده و گنج را با تو تقسیم می‌کند.',
        options: [],
        isEnding: true,
        endingType: 'happy'
      },
      {
        id: 'share-treasure',
        title: 'پایان: تقسیم دوستانه',
        content: 'با تقسیم گنج، هم تو ثروتمند می‌شوی و هم مردم جزیره. آن‌ها تو را کاپیتان افتخاری خود می‌کنند و دوستی ماندگاری شکل می‌گیرد.',
        options: [],
        isEnding: true,
        endingType: 'happy'
      },
      {
        id: 'solo-search',
        title: 'پایان: جستجوی انفرادی',
        content: 'در جستجوی انفرادی، گنج کوچک‌تری پیدا می‌کنی اما درس مهمی درباره ارزش دوستی و همکاری یاد می‌گیری.',
        options: [],
        isEnding: true,
        endingType: 'neutral'
      },
      {
        id: 'fair-share-ending',
        title: 'پایان: تقسیم عادلانه',
        content: 'گنج را عادلانه با خدمه تقسیم می‌کنی. همه خوشحال هستند و تو به عنوان کاپیتان عادل و مهربان شناخته می‌شوی. این آغاز ماجراجویی‌های جدید است.',
        options: [],
        isEnding: true,
        endingType: 'happy'
      }
    ]
  },
  {
    id: "magical-forest",
    title: "جنگل جادویی",
    description: "ماجراجویی در جنگل پر از موجودات جادویی",
    startBranchId: "forest-entrance",
    branches: [
      {
        id: "forest-entrance",
        title: "ورودی جنگل",
        content: "تو وارد جنگلی جادویی شده‌ای. دو مسیر پیش رویت است: یکی به سمت درختان بلند و دیگری به سمت نهری کوچک.",
        options: [
          {
            id: "path1",
            text: "برو به سمت درختان بلند",
            nextBranchId: "tall-trees"
          },
          {
            id: "path2", 
            text: "برو به سمت نهر کوچک",
            nextBranchId: "small-river"
          }
        ]
      },
      {
        id: "tall-trees",
        title: "درختان بلند",
        content: "در میان درختان بلند، یک پرنده سخنگو ملاقاتت می‌کند. او می‌گوید که گنجی مخفی در جنگل است.",
        options: [
          {
            id: "follow-bird",
            text: "پرنده را دنبال کن",
            nextBranchId: "treasure-found"
          },
          {
            id: "ignore-bird",
            text: "پرنده را نادیده بگیر",
            nextBranchId: "lost-in-forest"
          }
        ]
      },
      {
        id: "small-river",
        title: "نهر کوچک",
        content: "کنار نهر، یک ماهی طلایی می‌بینی که سه آرزو به تو می‌دهد.",
        options: [
          {
            id: "wish-wisdom",
            text: "آرزوی خرد کن",
            nextBranchId: "wisdom-ending"
          },
          {
            id: "wish-treasure",
            text: "آرزوی گنج کن", 
            nextBranchId: "treasure-found"
          }
        ]
      },
      {
        id: "treasure-found",
        title: "کشف گنج",
        content: "تبریک! گنج جادویی جنگل را پیدا کردی. این گنج قدرت درک زبان حیوانات را به تو می‌دهد.",
        options: [],
        isEnding: true,
        endingType: "happy"
      },
      {
        id: "wisdom-ending",
        title: "پایان خردمندانه",
        content: "با انتخاب خرد، تو حکیم جنگل شدی و همه موجودات از تو کمک می‌خواهند.",
        options: [],
        isEnding: true,
        endingType: "happy"
      },
      {
        id: "lost-in-forest",
        title: "گم شدن در جنگل",
        content: "متأسفانه در جنگل گم شدی، اما یاد گرفتی که همیشه به حیوانات گوش دهی.",
        options: [],
        isEnding: true,
        endingType: "neutral"
      }
    ]
  },
  {
    id: "ancient-cave",
    title: "راز غار کهن",
    description: "ماجراجویی باستان‌شناسی در غاری مرموز",
    startBranchId: "cave-entrance",
    branches: [
      {
        id: "cave-entrance",
        title: "ورودی غار",
        content: "تو یک باستان‌شناس هستی که وارد غاری باستانی شده‌ای. دو مسیر پیش رو داری: یکی به سمت صدایی مرموز و دیگری به سمت کتیبه‌ای قدیمی.",
        options: [
          {
            id: "follow-sound",
            text: "به سمت صدا",
            nextBranchId: "mysterious-sound"
          },
          {
            id: "examine-inscription", 
            text: "بررسی کتیبه",
            nextBranchId: "ancient-inscription"
          }
        ]
      },
      {
        id: "mysterious-sound",
        title: "صدای مرموز",
        content: "صدای یک موجود زنده را می‌شنوی. آیا به او نزدیک می‌شوی یا مخفی می‌مانی؟",
        options: [
          {
            id: "approach-creature",
            text: "نزدیک شدن",
            nextBranchId: "ancient-guardian"
          },
          {
            id: "stay-hidden",
            text: "مخفی ماندن",
            nextBranchId: "safe-escape"
          }
        ]
      },
      {
        id: "ancient-inscription",
        title: "کتیبه باستانی",
        content: "کتیبه حاوی نقشه‌ای به گنج است، اما تله‌ای فعال شده! آیا تله را خنثی می‌کنی یا فرار می‌کنی؟",
        options: [
          {
            id: "disable-trap",
            text: "خنثی کردن تله",
            nextBranchId: "treasure-chamber"
          },
          {
            id: "escape-trap",
            text: "فرار",
            nextBranchId: "safe-escape"
          }
        ]
      },
      {
        id: "ancient-guardian",
        title: "نگهبان باستانی",
        content: "موجود یک نگهبان باستانی است که گنج را به تو می‌دهد! تو رازهای غار را کشف کردی.",
        options: [],
        isEnding: true,
        endingType: "happy"
      },
      {
        id: "treasure-chamber",
        title: "اتاق گنج",
        content: "تله را خنثی کردی و گنج باستانی را یافتی! این کشف تاریخی بزرگی است.",
        options: [],
        isEnding: true,
        endingType: "happy"
      },
      {
        id: "safe-escape",
        title: "فرار امن",
        content: "از غار خارج شدی، اما راز آن را کشف نکردی. شاید بعداً بتوانی دوباره سعی کنی.",
        options: [],
        isEnding: true,
        endingType: "neutral"
      }
    ]
  },
  {
    id: "space-journey",
    title: "سفر به ستاره‌ها",
    description: "ماجراجویی علمی‌تخیلی در فضا",
    startBranchId: "space-signal",
    branches: [
      {
        id: "space-signal",
        title: "سیگنال فضایی",
        content: "تو یک فضانورد در یک سفینه فضایی هستی. سیگنالی ناشناس دریافت می‌کنی. آیا به سمت سیگنال می‌روی یا به مسیر اصلی ادامه می‌دهی؟",
        options: [
          {
            id: "follow-signal",
            text: "به سمت سیگنال",
            nextBranchId: "alien-encounter"
          },
          {
            id: "continue-path",
            text: "ادامه مسیر",
            nextBranchId: "asteroid-belt"
          }
        ]
      },
      {
        id: "alien-encounter",
        title: "ملاقات با بیگانگان",
        content: "یک سفینه بیگانه ظاهر می‌شود. آیا با آن‌ها ارتباط برقرار می‌کنی یا مخفی می‌مانی؟",
        options: [
          {
            id: "communicate",
            text: "ارتباط برقرار کردن",
            nextBranchId: "peaceful-aliens"
          },
          {
            id: "hide",
            text: "مخفی ماندن",
            nextBranchId: "return-to-base"
          }
        ]
      },
      {
        id: "asteroid-belt",
        title: "کمربند شهاب‌سنگ",
        content: "سفینه‌ات به یک کمربند شهاب‌سنگ برخورد می‌کند. آیا سعی می‌کنی از آن عبور کنی یا مسیر را تغییر می‌دهی؟",
        options: [
          {
            id: "navigate-through",
            text: "عبور از شهاب‌سنگ‌ها",
            nextBranchId: "successful-navigation"
          },
          {
            id: "change-route",
            text: "تغییر مسیر",
            nextBranchId: "return-to-base"
          }
        ]
      },
      {
        id: "peaceful-aliens",
        title: "بیگانگان دوستانه",
        content: "بیگانگان دوستانه هستند و فناوری پیشرفته‌ای به تو می‌دهند! ماموریت با موفقیت انجام شد.",
        options: [],
        isEnding: true,
        endingType: "happy"
      },
      {
        id: "successful-navigation",
        title: "موفقیت در مسیریابی",
        content: "با موفقیت از شهاب‌سنگ‌ها عبور کردی و به مقصد رسیدی! مهارت‌های خلبانی فوق‌العاده‌ای داری.",
        options: [],
        isEnding: true,
        endingType: "happy"
      },
      {
        id: "return-to-base",
        title: "بازگشت به پایگاه",
        content: "به پایگاه بازگشتی، اما ماموریت ناتمام ماند. حداقل با امنیت برگشتی.",
        options: [],
        isEnding: true,
        endingType: "neutral"
      }
    ]
  },
  {
    id: "caravanserai-mystery",
    title: "معمای کاروانسرا",
    description: "کارآگاهی تاریخی در دوره صفویه",
    startBranchId: "theft-report",
    branches: [
      {
        id: "theft-report",
        title: "گزارش سرقت",
        content: "تو یک کارآگاه در کاروانسرای دوره صفویه هستی. گنجی دزدیده شده. دو سرنخ داری: ردپا در حیاط یا نامه‌ای مشکوک.",
        options: [
          {
            id: "follow-footprints",
            text: "دنبال ردپا",
            nextBranchId: "courtyard-clues"
          },
          {
            id: "examine-letter",
            text: "بررسی نامه",
            nextBranchId: "suspicious-letter"
          }
        ]
      },
      {
        id: "courtyard-clues",
        title: "سرنخ‌های حیاط",
        content: "ردپا به انبار منتهی می‌شود. آیا داخل انبار می‌روی یا نگهبان را بازجویی می‌کنی؟",
        options: [
          {
            id: "enter-storage",
            text: "ورود به انبار",
            nextBranchId: "storage-discovery"
          },
          {
            id: "question-guard",
            text: "بازجویی نگهبان",
            nextBranchId: "guard-testimony"
          }
        ]
      },
      {
        id: "suspicious-letter",
        title: "نامه مشکوک",
        content: "نامه حاوی پیامی رمزنگاری‌شده است. آیا رمز را حل می‌کنی یا به دنبال نویسنده می‌گردی؟",
        options: [
          {
            id: "decode-message",
            text: "حل رمز",
            nextBranchId: "decoded-location"
          },
          {
            id: "find-writer",
            text: "جست‌وجوی نویسنده",
            nextBranchId: "guard-testimony"
          }
        ]
      },
      {
        id: "storage-discovery",
        title: "کشف در انبار",
        content: "گنج را در انبار پیدا کردی! دزد دستگیر شد و راز کاروانسرا حل شد.",
        options: [],
        isEnding: true,
        endingType: "happy"
      },
      {
        id: "decoded-location",
        title: "مکان رمزگشایی‌شده",
        content: "رمز تو را به مخفیگاه دزد هدایت کرد! کارآگاهی عالی انجام دادی.",
        options: [],
        isEnding: true,
        endingType: "happy"
      },
      {
        id: "guard-testimony",
        title: "شهادت نگهبان",
        content: "نگهبان بی‌گناه بود و سرنخ جدیدی نداد. معما حل نشد، اما حداقل بی‌گناهی او ثابت شد.",
        options: [],
        isEnding: true,
        endingType: "neutral"
      }
    ]
  },
  {
    id: "haunted-house",
    title: "خانه تسخیرشده",
    description: "ماجراجویی ترسناک در خانه مرموز",
    startBranchId: "house-entrance",
    branches: [
      {
        id: "house-entrance",
        title: "ورود به خانه",
        content: "تو وارد یک خانه تسخیرشده شده‌ای. صدایی از طبقه بالا می‌شنوی و دری در زیرزمین باز است.",
        options: [
          {
            id: "go-upstairs",
            text: "طبقه بالا",
            nextBranchId: "upstairs-mystery"
          },
          {
            id: "go-basement",
            text: "زیرزمین",
            nextBranchId: "basement-secrets"
          }
        ]
      },
      {
        id: "upstairs-mystery",
        title: "راز طبقه بالا",
        content: "یک کتاب جادویی پیدا می‌کنی. آیا آن را باز می‌کنی یا به دنبال صاحبش می‌گردی؟",
        options: [
          {
            id: "open-book",
            text: "باز کردن کتاب",
            nextBranchId: "magical-revelation"
          },
          {
            id: "find-owner",
            text: "جست‌وجوی صاحب",
            nextBranchId: "safe-exit"
          }
        ]
      },
      {
        id: "basement-secrets",
        title: "اسرار زیرزمین",
        content: "یک صندوق قفل‌شده می‌بینی. آیا قفل را می‌شکنی یا به بالا بازمی‌گردی؟",
        options: [
          {
            id: "break-lock",
            text: "شکستن قفل",
            nextBranchId: "chest-contents"
          },
          {
            id: "return-upstairs",
            text: "بازگشت به بالا",
            nextBranchId: "safe-exit"
          }
        ]
      },
      {
        id: "magical-revelation",
        title: "آشکار شدن جادو",
        content: "کتاب نفرین را آزاد کرد، اما راز خانه را کشف کردی! حالا می‌دانی چطور ارواح را آرام کنی.",
        options: [],
        isEnding: true,
        endingType: "happy"
      },
      {
        id: "chest-contents",
        title: "محتویات صندوق",
        content: "صندوق حاوی مدارک قدیمی بود که راز خانه را فاش کرد! تاریخ تراژیک خانواده را کشف کردی.",
        options: [],
        isEnding: true,
        endingType: "happy"
      },
      {
        id: "safe-exit",
        title: "خروج امن",
        content: "از خانه فرار کردی، اما راز آن را کشف نکردی. گاهی فرار بهترین انتخاب است.",
        options: [],
        isEnding: true,
        endingType: "neutral"
      }
    ]
  }
];
