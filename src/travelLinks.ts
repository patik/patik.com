import TravelImageBosnia from '@src/images/bosnia-sarajevo-hero.jpg'
import BrugesImage from '@src/images/britain-benelux-bruges-link.jpg'
import NetherlandsImage from '@src/images/britain-benelux-netherlands-link.jpg'
import TravelImageIreland from '@src/images/ireland-dublin-hero.jpg'
import TravelImageItaly from '@src/images/italy-venice-hero.jpg'
import UruguayImage from '@src/images/peru-argentina-link-colonia.jpg'
import BritainbeneluxImage from '@src/images/travel-britain-benelux.jpg'
import FranceImage from '@src/images/travel-france.jpg'
import GermanyImage from '@src/images/travel-germany.jpg'
import GreeceImage from '@src/images/travel-greece.jpg'
import PeruImage from '@src/images/travel-peru-argentina.jpg'
import SpainImage from '@src/images/travel-spain.jpg'
import TurkeyImage from '@src/images/travel-turkey.jpg'
import TravelImageUzbekistan from '@src/images/uzbekistan-khiva-night.jpg'
import TravelImageVietnam from '@src/images/vietnam-ho-chi-minh-city-hero.jpg'
import type { HTMLAttributes } from 'astro/types'

export interface TravelLink {
    title: string
    className: string
    url: string
    imageSrc: ImageMetadata
    imageAlt: string
    imageAttributes?: Omit<HTMLAttributes<'img'>, 'height' | 'src' | 'width'>
}

export const travelLinks: TravelLink[] = [
    {
        title: 'Bosnia',
        className: 'bg-travel-bottom-middle',
        url: '/travel/bosnia/',
        imageSrc: TravelImageBosnia,
        imageAlt: 'Sarajevo, Bosnia and Herzegovina',
    },
    {
        title: 'Uzbekistan',
        className: 'bg-travel-bottom-middle',
        url: '/travel/uzbekistan/',
        imageSrc: TravelImageUzbekistan,
        imageAlt: 'The façade of a mausoleum in Khiva',
    },
    {
        title: 'Ireland',
        className: 'bg-travel-bottom-middle',
        url: '/travel/ireland/',
        imageSrc: TravelImageIreland,
        imageAlt: 'Dublin, Ireland',
    },
    {
        title: 'Italy',
        className: 'bg-travel-bottom-middle bg-travel-italy',
        url: '/travel/italy/',
        imageSrc: TravelImageItaly,
        imageAlt: 'Venice, Italy',
    },
    {
        title: 'Vietnam',
        className: 'bg-travel-bottom-middle',
        url: '/travel/vietnam/',
        imageSrc: TravelImageVietnam,
        imageAlt: 'Ho Chi Minh City, Vietnam',
    },
    {
        title: 'Britain',
        className: 'bg-travel-britain',
        url: '/travel/britain/',
        imageSrc: BritainbeneluxImage,
        imageAlt: 'Big Ben, a black cab, and a red double-decker bus in Parliament Square',
    },
    {
        title: 'Netherlands',
        className: 'bg-travel-bottom-middle bg-travel-netherlands',
        url: '/travel/netherlands/',
        imageSrc: NetherlandsImage,
        imageAlt: 'Westerkerk, overlooking an Amsterdam canal',
    },
    {
        title: 'Peru',
        className: 'bg-travel-peru',
        url: '/travel/peru/',
        imageSrc: PeruImage,
        imageAlt: 'Kim holding a lamb and posing with two women in traditional Andean clothes',
        imageAttributes: { 'data-focal-point': 'top' },
    },
    {
        title: 'Spain, Portugal, & Morocco',
        className: 'bg-travel-spain',
        url: '/travel/spain/',
        imageSrc: SpainImage,
        imageAlt: "Celebrating Spain's World Cup victory in Madrid",
    },
    {
        title: 'Turkey',
        className: 'bg-travel-turkey',
        url: '/travel/turkey/',
        imageSrc: TurkeyImage,
        imageAlt: 'The Blue Mosque (Sultanahmet Camii), Istanbul, Turkey',
    },
    {
        title: 'Belgium',
        className: 'bg-belgium-bruges',
        url: '/travel/belgium/',
        imageSrc: BrugesImage,
        imageAlt: 'Windmill in the Belgian countryside',
    },
    {
        title: 'Germany & Austria',
        className: 'bg-travel-germany',
        url: '/travel/germany/',
        imageSrc: GermanyImage,
        imageAlt: 'Spanish fans in Vienna for Euro 2008',
    },
    {
        title: 'Greece',
        className: 'bg-travel-greece',
        url: '/travel/greece/',
        imageSrc: GreeceImage,
        imageAlt: 'Serifios, Greece',
    },
    {
        title: 'France',
        className: 'bg-travel-france',
        url: '/travel/france/',
        imageSrc: FranceImage,
        imageAlt: 'The Seine River',
    },
    {
        title: 'Uruguay',
        className: '',
        url: '/travel/uruguay/',
        imageSrc: UruguayImage,
        imageAlt: 'Old train in Colonia del Sacramento, Uruguay',
    },
]
