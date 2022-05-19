import { showToast } from 'remax/wechat';

export function showCustomToast(props: { message: string, duration: number }): ReturnType<typeof showToast> {
  return showToast({
    title: props.message,
    image: '/image/success.png',
    mask: true,
    duration: props.duration
  });
}
