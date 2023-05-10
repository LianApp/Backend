import { default as EasyYandexS3 } from 'easy-yandex-s3';

export const cloudStorage = new EasyYandexS3({
  auth: {
    accessKeyId: "YCAJEWZ_i1I1-vAB44j8xoIQK",
    secretAccessKey: "YCO_HtgLitNbCIwetJHe5VnA332511bZpeUIe0fB"
  },
  Bucket: "share-buckett",
  debug: true
})

