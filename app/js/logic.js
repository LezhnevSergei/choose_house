// state

const state = {
    house: '',
    floor: '',
    layout: '',
};

//unlocked links

const unlockedLinks = []

// clear buttons

const clear = (btns, cls) => {
    btns.forEach(btn => btn.classList.remove(cls))
}

// content

const contentBlock = document.querySelector('.select-content')

// mobile buttons logic

const buttonLeft = document.querySelector('.button--left')
const buttonRight = document.querySelector('.button--right')


// navigate buttons animation

const pages = [
    {
        name: '.houses',
        number: 0
    },
    {
        name: '.floors',
        number: 1
    },
    {
        name: '.plan',
        number: 2
    },
    {
        name: '.selection',
        number: 3
    },
]

let navigationButtons =  document.querySelectorAll(`.steps__button`);

//blocking links
navigationButtons.forEach(btn => btn.classList.add('block-link'))
document.querySelectorAll('.button--right').forEach(btn => btn.classList.add('block-link'))


for (let i = 0; i < pages.length; i++) {
    if (document.querySelector(pages[i].name)) {
        const btns = []
        btns.push(navigationButtons[pages[i].number])
        btns.push(navigationButtons[pages[i].number + 4])

        if (pages[i].number === 0) {
            sessionStorage.clear()
            state.house = ''
            state.floor = ''
            state.layout = ''
            sessionStorage.setItem('house', state.house)
            sessionStorage.setItem('floor', state.floor)
            sessionStorage.setItem('layout', state.layout)
            document.querySelectorAll('.selected-section').forEach(i => i.textContent = state.house)
            document.querySelectorAll('.selected-floor').forEach(i => i.textContent = state.floor)
            document.querySelectorAll('.selected-layout').forEach(i => i.textContent = state.layout)

            contentBlock.style.height = '300px';


            buttonLeft.setAttribute('href', '/pages/Houses/houses.html')
            buttonRight.setAttribute('href', '/pages/Floors/floors.html')
        }


        if (pages[i].number === 1) {
            sessionStorage.removeItem('floor')
            sessionStorage.removeItem('layout')
            state.floor = ''
            state.layout = ''
            sessionStorage.setItem('floor', state.floor)
            sessionStorage.setItem('layout', state.layout)
            document.querySelectorAll('.selected-floor').forEach(i => i.textContent = state.floor)
            document.querySelectorAll('.selected-layout').forEach(i => i.textContent = state.layout )

            unlockedLinks.push(navigationButtons[1], navigationButtons[5])

            contentBlock.style.height = '330px';

            buttonLeft.setAttribute('href', '/pages/Houses/houses.html')
            buttonRight.setAttribute('href', '/pages/Layout/layout.html')
        }

        if (pages[i].number === 2) {
            sessionStorage.removeItem('layout')
            state.layout = ''
            sessionStorage.setItem('layout', state.layout)
            document.querySelectorAll('.selected-layout').forEach(i => i.textContent = state.layout)

            unlockedLinks.push(navigationButtons[1], navigationButtons[5])
            unlockedLinks.push(navigationButtons[2], navigationButtons[6])

            contentBlock.style.height = '220px';

            buttonLeft.setAttribute('href', '/pages/Floors/floors.html')
            buttonRight.setAttribute('href','/pages/Selection/selection.html')
        }

        if (pages[i].number === 3) {
            unlockedLinks.push(navigationButtons[1], navigationButtons[5])
            unlockedLinks.push(navigationButtons[2], navigationButtons[6])

            contentBlock.style.height = '820px';

            buttonLeft.setAttribute('href', '/pages/Layout/layout.html')
            document.querySelector('.button--right').style.backgroundColor = 'transparent'
            document.querySelector('.button--right').style.pointerEvents = 'none';
        }

        for (let j = 0; j < btns.length; j++) {
            if (btns[j].parentElement.classList.contains('steps__buttons--mobile')) {
                clear(navigationButtons, 'button--step-mobile-selected')
                btns[j].classList.add('button--step-mobile-selected')
            } else {
                clear(navigationButtons, 'button--step-selected')
                btns[j].classList.add('button--step-selected')
            }

        }

    }
}


// floor buttons animation

let floorButtons =  document.querySelectorAll(`.floor, .floor--mobile`);

floorButtons.forEach(btn => btn.addEventListener('click', () => {
    if (btn.classList.contains('floor--mobile')) {
        clear(floorButtons, 'floor--mobile--selected')
        btn.classList.add('floor--mobile--selected')
    } else {
        clear(floorButtons, 'floor--selected')
        btn.classList.add('floor--selected')
    }

    state.floor = btn.classList.contains('floor--anyway') ? 'Не важно' : btn.textContent.split(' ')[0] + ` этаж`


    document.querySelectorAll('.selected-floor').forEach(i => i.textContent = state.floor)

    sessionStorage.setItem('floor', state.floor)

}))



// house buttons animation

let houseButtons = [...Array(4)].map( (btn, i) =>  document.querySelector(`#house-` + `${i+1}`));

if (document.querySelector('.houses')) {
    houseButtons.forEach(btn => btn.addEventListener('click', () => {
        clear(houseButtons, 'house--selected')
        btn.classList.add('house--selected')

        const translateToRoman = (number) => {
            const roman = [
                '0',
                'I',
                'II',
                'III',
                'IV',
            ];

            for (let i = 0; i < roman.length; i++) {
                if (i == number)
                    return roman[i]
            }

        }

        state.house = translateToRoman(btn.id.slice(btn.id.length - 1)) + ` секция`


        if (state.house)
            document.querySelector('.navigation__heading').textContent = 'Вы выбрали:'

        document.querySelectorAll('.selected-section').forEach(i => i.textContent = state.house)

        sessionStorage.setItem('house', state.house)

        sessionStorage.house === '' ? document.querySelectorAll('.choice-text').forEach(i => i.textContent = '' )
            : document.querySelectorAll('.choice-text').forEach(i => i.textContent = 'Выбрано:' )

    }))
}


// layout logic

const rooms = document.querySelectorAll('.room')

rooms.forEach(room => room.addEventListener('click', () => {
    state.layout = '№2312131'
    document.querySelectorAll('.selected-layout').forEach(i => i.textContent = state.layout)
    sessionStorage.setItem('layout', state.layout)
}))

// navigation blocking

const unlockingLinks = (unlockedLinks) => {
    unlockedLinks.forEach(btn => btn.classList.remove('block-link'))
}

unlockedLinks.push(navigationButtons[0], navigationButtons[4])
unlockingLinks(unlockedLinks)

houseButtons.forEach(btn => btn !== null ? btn.addEventListener('click', () => {
    unlockedLinks.push(navigationButtons[1], navigationButtons[5], buttonRight)
    unlockingLinks(unlockedLinks)
    console.log(unlockedLinks)

}) : null)

floorButtons.forEach(btn => btn.addEventListener('click', () => {
    unlockedLinks.push(navigationButtons[2], navigationButtons[6], buttonRight)
    unlockingLinks(unlockedLinks)
    console.log(unlockedLinks)
}))

rooms.forEach(btn => btn.addEventListener('click', () => {
    unlockedLinks.push(navigationButtons[1], navigationButtons[5])
    unlockedLinks.push(navigationButtons[2], navigationButtons[6])
    unlockedLinks.push(navigationButtons[3], navigationButtons[7], buttonRight)
    unlockingLinks(unlockedLinks)
    console.log(unlockedLinks)
}))





// selected section

sessionStorage.house === '' ? document.querySelectorAll('.choice-text').forEach(i => i.textContent = '' )
    : document.querySelectorAll('.choice-text').forEach(i => i.textContent = 'Выбрано:' )



document.querySelectorAll('.selected-section').forEach(i => i.textContent = sessionStorage.getItem('house'))
document.querySelectorAll('.selected-floor').forEach(i => i.textContent = sessionStorage.getItem('floor'))
document.querySelectorAll('.selected-layout').forEach(i => i.textContent = sessionStorage.getItem('layout'))







