/**
 * レスポンシブの切り替え幅。
 *
 * itmaroon のブロックは styleDataApply が実行時にCSSを組み立てるため、
 * メディアクエリの値をこの定数から差し込める。切り替え幅を変えるときは
 * ここ1箇所を直す。
 *
 * WordPress 7.1 の `settings.viewport` の既定は mobile 480px / tablet 782px。
 * 将来そちらへ寄せるなら、この値を差し替えるか、解決済みの viewport 設定を
 * PHP から JS へ渡して MOBILE_MAX_WIDTH の初期値にする。
 *
 * 【重要】このモジュールは依存を持たない。Style*.tsx 経由でビュースクリプトから
 * 読まれるため、@wordpress/* や react を import しないこと。
 *
 * SCSS 側（reset.scss / _common.scss の $breakpoints マップ）は別管理になっている。
 * 値を変えるときは両方を揃えること。
 */

//この幅以下をモバイルとみなす
export const MOBILE_MAX_WIDTH = 767;

//メディア特性（matchMedia にそのまま渡せる）
export const MOBILE_QUERY = `(max-width: ${MOBILE_MAX_WIDTH}px)`;
export const TABLET_UP_QUERY = `(min-width: ${MOBILE_MAX_WIDTH + 1}px)`;

//テンプレートリテラル内のCSSに埋める用（`${MEDIA_MOBILE} { ... }`）
export const MEDIA_MOBILE = `@media ${MOBILE_QUERY}`;
export const MEDIA_TABLET_UP = `@media ${TABLET_UP_QUERY}`;
