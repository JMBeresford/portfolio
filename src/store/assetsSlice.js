import albedoImage1 from '@/assets/img/bakes/albedo1.jpg';
import albedoImage2 from '@/assets/img/bakes/albedo2.jpg';
import lightMapImage1_1 from '@/assets/img/bakes/lightmap1_1.jpg';
import lightMapImage1_2 from '@/assets/img/bakes/lightmap1_2.jpg';
import lightMapImage2_1 from '@/assets/img/bakes/lightmap2_1.jpg';
import lightMapImage2_2 from '@/assets/img/bakes/lightmap2_2.jpg';
import lightMapImage3_1 from '@/assets/img/bakes/lightmap3_1.jpg';
import lightMapImage3_2 from '@/assets/img/bakes/lightmap3_2.jpg';
import lightMapImage4_1 from '@/assets/img/bakes/lightmap4_1.jpg';
import lightMapImage4_2 from '@/assets/img/bakes/lightmap4_2.jpg';
import lightMapImage5_1 from '@/assets/img/bakes/lightmap5_1.jpg';
import lightMapImage5_2 from '@/assets/img/bakes/lightmap5_2.jpg';
import lightningImage from '@/assets/img/lightning.jpg';
import particleMask from '@/assets/img/particle.jpg';

import artofjayjoson0 from '@/assets/img/artofjayjoson/0.webp';
import artofjayjoson1 from '@/assets/img/artofjayjoson/1.webp';
import artofjayjoson2 from '@/assets/img/artofjayjoson/2.webp';
import artofjayjoson3 from '@/assets/img/artofjayjoson/3.webp';
import artofjayjoson4 from '@/assets/img/artofjayjoson/4.webp';

import ucscchessclub0 from '@/assets/img/ucscchessclub/0.webp';
import ucscchessclub1 from '@/assets/img/ucscchessclub/1.webp';
import ucscchessclub2 from '@/assets/img/ucscchessclub/2.webp';
import ucscchessclub3 from '@/assets/img/ucscchessclub/3.webp';
import ucscchessclub4 from '@/assets/img/ucscchessclub/4.webp';

import deforestationdetector0 from '@/assets/img/deforestationdetector/0.webp';
import deforestationdetector1 from '@/assets/img/deforestationdetector/1.webp';
import deforestationdetector2 from '@/assets/img/deforestationdetector/2.webp';
import deforestationdetector3 from '@/assets/img/deforestationdetector/3.webp';
import deforestationdetector4 from '@/assets/img/deforestationdetector/4.webp';

const assetsSlice = (set, get) => ({
  maps: {
    albedo1: albedoImage1.src,
    albedo2: albedoImage2.src,
    lm11: lightMapImage1_1.src,
    lm12: lightMapImage1_2.src,
    lm21: lightMapImage2_1.src,
    lm22: lightMapImage2_2.src,
    lm31: lightMapImage3_1.src,
    lm32: lightMapImage3_2.src,
    lm41: lightMapImage4_1.src,
    lm42: lightMapImage4_2.src,
    lm51: lightMapImage5_1.src,
    lm52: lightMapImage5_2.src,
    lightning: lightningImage.src,
    particle: particleMask.src,
  },

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
});

const assetsActions = (set, get) => ({});

export { assetsSlice, assetsActions };
