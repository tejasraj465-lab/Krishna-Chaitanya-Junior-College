import { GALLERY_ITEMS } from './collegeData';
import { NccGalleryCategory, NccGalleryPhoto } from './nccData';
import nccGroupCampus from '../assets/ncc/ncc-group-campus.jpg';
import nccCampTents from '../assets/ncc/ncc-camp-tents.jpg';
import nccCampCelebration from '../assets/ncc/ncc-camp-celebration.png';
import nccTrophy from '../assets/ncc/ncc-trophy.jpg';
import nccAtcClosing from '../assets/ncc/ncc-atc-closing.jpg';
import nccBeachDrill from '../assets/ncc/ncc-beach-drill.jpg';
import nccWeaponTraining from '../assets/ncc/ncc-weapon-training.jpg';

const isRealPhotoUrl = (url: string) =>
  !url.includes('unsplash.com') && !url.includes('placeholder');

const NCC_UPLOADED_PHOTOS: NccGalleryPhoto[] = [
  {
    id: 'ncc-group-campus',
    title: 'NCC Cadet Contingent',
    category: 'Group Photo',
    image: nccGroupCampus,
    caption: 'KCJC NCC cadets in uniform on campus.',
  },
  {
    id: 'ncc-camp-tents',
    title: 'Annual Training Camp',
    category: 'Camps',
    image: nccCampTents,
    caption: 'Cadets at tent lines during annual training camp.',
  },
  {
    id: 'ncc-camp-celebration',
    title: 'Camp Activities',
    category: 'Camps',
    image: nccCampCelebration,
    caption: 'NCC cadets together during camp activities.',
  },
  {
    id: 'ncc-trophy',
    title: 'NCC Achievement',
    category: 'Certificate Distribution',
    image: nccTrophy,
    caption: 'Cadets with trophy and certificate of achievement.',
  },
  {
    id: 'ncc-atc-closing',
    title: 'ATC Closing Address',
    category: 'Camps',
    image: nccAtcClosing,
    caption: '24 Andhra BN NCC, Nellore — ATC closing address.',
  },
  {
    id: 'ncc-beach-drill',
    title: 'Outdoor Drill Formation',
    category: 'Drill Practice',
    image: nccBeachDrill,
    caption: 'Cadets in formation during outdoor drill training.',
  },
  {
    id: 'ncc-weapon-training',
    title: 'Weapon Training',
    category: 'Training',
    image: nccWeaponTraining,
    caption: 'Weapon training as per NCC curriculum.',
  },
];

/** Real NCC gallery photos only — uploaded cadet photos plus any verified website gallery items */
export const NCC_GALLERY_PHOTOS: NccGalleryPhoto[] = [
  ...NCC_UPLOADED_PHOTOS,
  ...GALLERY_ITEMS.filter((item) => item.category === 'NCC' && isRealPhotoUrl(item.image)).map((item) => ({
    id: item.id,
    title: item.title,
    category: 'Group Photo' as NccGalleryCategory,
    image: item.image,
    caption: item.caption,
  })),
];
