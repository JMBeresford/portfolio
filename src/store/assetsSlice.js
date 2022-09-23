import particleMask from '@/assets/img/particle.jpg';

import artofjayjoson0 from '@/assets/img/artofjayjoson/0.webp';
import artofjayjoson1 from '@/assets/img/artofjayjoson/1.webp';
import artofjayjoson2 from '@/assets/img/artofjayjoson/2.webp';
import artofjayjoson3 from '@/assets/img/artofjayjoson/3.webp';
import artofjayjoson4 from '@/assets/img/artofjayjoson/4.webp';
import artofjayjosonAvatar from '@/assets/img/artofjayjoson/avatar.webp';

import ucscchessclub0 from '@/assets/img/ucscchessclub/0.webp';
import ucscchessclub1 from '@/assets/img/ucscchessclub/1.webp';
import ucscchessclub2 from '@/assets/img/ucscchessclub/2.webp';
import ucscchessclub3 from '@/assets/img/ucscchessclub/3.webp';
import ucscchessclub4 from '@/assets/img/ucscchessclub/4.webp';
import ucscchessclubAvatar from '@/assets/img/ucscchessclub/avatar.webp';

import deforestationdetector0 from '@/assets/img/deforestationdetector/0.webp';
import deforestationdetector1 from '@/assets/img/deforestationdetector/1.webp';
import deforestationdetector2 from '@/assets/img/deforestationdetector/2.webp';
import deforestationdetector3 from '@/assets/img/deforestationdetector/3.webp';
import deforestationdetector4 from '@/assets/img/deforestationdetector/4.webp';
import deforestationdetectorAvatar from '@/assets/img/deforestationdetector/avatar.webp';

const assetsSlice = (set, get) => ({
  workImages: {
    artofjayjoson: [
      artofjayjoson0.src,
      artofjayjoson1.src,
      artofjayjoson2.src,
      artofjayjoson3.src,
      artofjayjoson4.src,
    ],
    ucscchessclub: [
      ucscchessclub0.src,
      ucscchessclub1.src,
      ucscchessclub2.src,
      ucscchessclub3.src,
      ucscchessclub4.src,
    ],
    deforestationdetector: [
      deforestationdetector0.src,
      deforestationdetector1.src,
      deforestationdetector2.src,
      deforestationdetector3.src,
      deforestationdetector4.src,
    ],
  },

  workAvatars: {
    artofjayjoson: artofjayjosonAvatar.src,
    ucscchessclub: ucscchessclubAvatar.src,
    deforestationdetector: deforestationdetectorAvatar.src,
  },
});

const assetsActions = (set, get) => ({});

export { assetsSlice, assetsActions };
