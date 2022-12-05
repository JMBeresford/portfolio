import artofjayjoson0 from '@/assets/img/artofjayjoson/0.jpeg';
import artofjayjoson1 from '@/assets/img/artofjayjoson/1.jpeg';
import artofjayjoson2 from '@/assets/img/artofjayjoson/2.jpeg';
import artofjayjoson3 from '@/assets/img/artofjayjoson/3.jpeg';
import artofjayjoson4 from '@/assets/img/artofjayjoson/4.jpeg';
import artofjayjosonavatar from '@/assets/img/artofjayjoson/avatar.webp';

import deforestationdetector0 from '@/assets/img/deforestationdetector/0.jpeg';
import deforestationdetector1 from '@/assets/img/deforestationdetector/1.jpeg';
import deforestationdetector2 from '@/assets/img/deforestationdetector/2.jpeg';
import deforestationdetector3 from '@/assets/img/deforestationdetector/3.jpeg';
import deforestationdetector4 from '@/assets/img/deforestationdetector/4.jpeg';
import deforestationdetectoravatar from '@/assets/img/deforestationdetector/avatar.webp';

import ucscchessclub0 from '@/assets/img/ucscchessclub/0.jpeg';
import ucscchessclub1 from '@/assets/img/ucscchessclub/1.jpeg';
import ucscchessclub2 from '@/assets/img/ucscchessclub/2.jpeg';
import ucscchessclub3 from '@/assets/img/ucscchessclub/3.jpeg';
import ucscchessclub4 from '@/assets/img/ucscchessclub/4.jpeg';
import ucscchessclubavatar from '@/assets/img/ucscchessclub/avatar.webp';

const imagesSlice = {
  artofjayjoson: {
    images: [
      artofjayjoson0.src,
      artofjayjoson1.src,
      artofjayjoson2.src,
      artofjayjoson3.src,
      artofjayjoson4.src,
    ],
    avatar: artofjayjosonavatar.src,
  },
  deforestationdetector: {
    images: [
      deforestationdetector0.src,
      deforestationdetector1.src,
      deforestationdetector2.src,
      deforestationdetector3.src,
      deforestationdetector4.src,
    ],
    avatar: deforestationdetectoravatar.src,
  },
  ucscchessclub: {
    images: [
      ucscchessclub0.src,
      ucscchessclub1.src,
      ucscchessclub2.src,
      ucscchessclub3.src,
      ucscchessclub4.src,
    ],
    avatar: ucscchessclubavatar.src,
  },
};

const imagesActions = (set, get) => ({});

export { imagesSlice, imagesActions };
