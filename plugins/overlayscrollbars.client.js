import 'overlayscrollbars/overlayscrollbars.css';
import {
  OverlayScrollbars,
  ScrollbarsHidingPlugin,
  SizeObserverPlugin,
  ClickScrollPlugin
} from 'overlayscrollbars';

export default defineNuxtPlugin(() => {
  const main = OverlayScrollbars(document.querySelector('body'), {})
})