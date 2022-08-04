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
  },
});

const assetsActions = (set, get) => ({});

export { assetsSlice, assetsActions };
