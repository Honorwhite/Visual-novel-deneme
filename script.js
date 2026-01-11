const story = [
    {
        character: "Cemrik",
        text: "Selam millet! Ben Cemrik. Şehrin en lezzetli burger dükkanına hoş geldiniz!",
        background: "assets/bg.png",
        image: "assets/cemrik.png"
    },
    {
        character: "Cemrik",
        text: "Yarın büyük 'Burger Festivali' var ama hala o meşhur 'Gizli Sos'u tamamlayamadım.",
        background: "assets/bg.png",
        image: "assets/cemrik.png"
    },
    {
        character: "Cemrik",
        text: "Dükkanın arka bahçesinde bizim malzemelerle bir toplantı yapsam iyi olacak. Bakalım kimlerin ne fikri var?",
        background: "assets/bg.png",
        image: "assets/cemrik.png"
    },
    {
        character: "Marul Mesut",
        text: "Hey dostum, sakin ol... En önemli şey taze kalmak, anlıyor musun? 'Stay Fresh' bebeğim.",
        background: "assets/bg.png",
        image: "assets/marul.png"
    },
    {
        character: "Cemrik",
        text: "Mesut, festival diyorum! Heyecan diyorum! Sen hala yapraklarını sallıyorsun.",
        background: "assets/bg.png",
        image: "assets/cemrik.png"
    },
    {
        character: "Acı Ali",
        text: "NE DİYORSUNUZ LAN SİZ?! ACIIII! ATEŞŞŞ! HER YER YANMALI!",
        background: "assets/bg.png",
        image: "assets/ali.png"
    },
    {
        character: "Cemrik",
        text: "Ali, biraz sakinleş... Müşterilerin ağzından alev çıkmasını istemiyoruz, sadece lezzet istiyoruz.",
        background: "assets/bg.png",
        image: "assets/cemrik.png"
    },
    {
        character: "Acı Ali",
        text: "LEZZET ACIDADIR! ACISI OLMAYAN BURGER, BURGER DEĞİLDİR! BEN GİDİYORUM!",
        background: "assets/bg.png",
        image: "assets/ali.png"
    },
    {
        character: "Cemrik",
        text: "Haydaaa... Ali sinirlendi. Şimdi ne yapacağız?",
        background: "assets/bg.png",
        image: "assets/cemrik.png",
        choices: [
            { text: "Mesut'un ferahlığına güven", nextScene: 9 },
            { text: "Ali'nin peşinden git ve gönlünü al", nextScene: 12 }
        ]
    },
    {
        id: 9,
        character: "Marul Mesut",
        text: "Boşver onu dostum... Al bu naneli mayonezi, her şeyi ferahlatacak. Festivali biz kazanacağız.",
        background: "assets/bg.png",
        image: "assets/marul.png"
    },
    {
        character: "Cemrik",
        text: "Naneli mayonez mi? Pek emin değilim ama... Deneyelim bakalım!",
        background: "assets/bg.png",
        image: "assets/cemrik.png"
    },
    {
        character: "Sistem",
        text: "VE CEMRİK BURGER, FERAH BURGERİYLE FESTİVALİN EN İLGİNÇ BURGERİ SEÇİLDİ! (AMA BİRAZ GARİP KARŞILANDI...)",
        background: "assets/bg.png",
        image: "",
        nextScene: -1 // End
    },
    {
        id: 12,
        character: "Acı Ali",
        text: "Tamam tamam... Biraz abartmış olabilirim. Al bak, bu özel 'Habanero Balı'. Hem tatlı hem yakıcı.",
        background: "assets/bg.png",
        image: "assets/ali.png"
    },
    {
        character: "Cemrik",
        text: "İşte bu! Hem tatlı hem acı! Mükemmel denge bu Ali, teşekkürler!",
        background: "assets/bg.png",
        image: "assets/cemrik.png"
    },
    {
        character: "Sistem",
        text: "CEMRİK BURGER, 'ACILI TATLI' SOSUYLA FESTİVALİN BİRİNCİSİ OLDU! ŞEHİR CEMRİK'İ KONUŞUYOR!",
        background: "assets/bg.png",
        image: "",
        nextScene: -1 // End
    }
];

let currentSceneIndex = 0;

const backgroundLayer = document.getElementById('background-layer');
const characterSprite = document.getElementById('character-sprite');
const characterName = document.getElementById('character-name');
const dialogText = document.getElementById('dialog-text');
const dialogBox = document.getElementById('dialog-box');
const choiceContainer = document.getElementById('choice-container');
const startScreen = document.getElementById('start-screen');
const startButton = document.getElementById('start-button');

let isTyping = false;
let typeInterval;

function updateScene() {
    const scene = story[currentSceneIndex];

    // Update background if changed
    if (scene.background) {
        backgroundLayer.style.backgroundImage = `url(${scene.background})`;
    }

    // Update character sprite
    if (scene.image) {
        characterSprite.src = scene.image;
        characterSprite.style.opacity = '1';
        characterSprite.classList.add('active');
    } else {
        characterSprite.classList.remove('active');
        characterSprite.style.opacity = '0';
    }

    // Update text
    characterName.textContent = scene.character;

    // Typewriter effect
    typeText(scene.text);

    // Handle choices
    if (scene.choices) {
        choiceContainer.innerHTML = '';
        scene.choices.forEach(choice => {
            const button = document.createElement('div');
            button.className = 'choice-button';
            button.innerText = choice.text;
            button.onclick = () => {
                if (isTyping) {
                    completeText(scene.text);
                    return;
                }
                choiceContainer.classList.add('hidden');
                dialogBox.classList.remove('hidden');
                currentSceneIndex = story.findIndex(s => s.id === choice.nextScene);
                updateScene();
            };
            choiceContainer.appendChild(button);
        });
        // We show choices after typing is done
    } else {
        choiceContainer.classList.add('hidden');
        dialogBox.classList.remove('hidden');
    }
}

function typeText(text) {
    clearInterval(typeInterval);
    isTyping = true;
    dialogText.textContent = '';
    let i = 0;
    typeInterval = setInterval(() => {
        if (i < text.length) {
            dialogText.textContent += text.charAt(i);
            i++;
        } else {
            clearInterval(typeInterval);
            isTyping = false;
            checkChoices();
        }
    }, 30);
}

function completeText(text) {
    clearInterval(typeInterval);
    dialogText.textContent = text;
    isTyping = false;
    checkChoices();
}

function checkChoices() {
    const scene = story[currentSceneIndex];
    if (scene.choices && !isTyping) {
        choiceContainer.classList.remove('hidden');
        dialogBox.classList.add('hidden');
    }
}

function nextScene() {
    const scene = story[currentSceneIndex];

    if (isTyping) {
        completeText(scene.text);
        return;
    }

    if (scene.choices) return;

    if (scene.nextScene === -1) {
        // End of game
        alert("Oyun Bitti! Cemrik ile daha fazla macera için bizi takip edin.");
        location.reload();
        return;
    }

    if (scene.nextScene !== undefined) {
        currentSceneIndex = story.findIndex(s => s.id === scene.nextScene);
    } else {
        currentSceneIndex++;
    }

    if (currentSceneIndex < story.length) {
        updateScene();
    }
}

dialogBox.addEventListener('click', nextScene);

startButton.addEventListener('click', () => {
    startScreen.style.opacity = '0';
    setTimeout(() => {
        startScreen.classList.add('hidden');
        updateScene();
    }, 800);
});
