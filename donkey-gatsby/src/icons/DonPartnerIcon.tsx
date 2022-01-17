import { IIconProps } from "./interfaces";

export const DonPartnerIcon = (props: IIconProps) => {
    return (
      <svg
        width={128}
        height={82}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
      >
        <path d="M127.5 67 59 8l-9.5 59h78Z" fill="url(#a)" />
        <g filter="url(#b)">
          <circle cx={41} cy={37} r={37} fill="url(#c)" />
          <circle cx={41} cy={37} r={34} stroke="#fff" strokeWidth={6} />
        </g>
        <mask
          id="d"
          style={{
            maskType: "alpha",
          }}
          maskUnits="userSpaceOnUse"
          x={8}
          y={3}
          width={65}
          height={65}
        >
          <circle cx={40.5} cy={35.5} r={32.5} fill="#FAC200" />
        </mask>
        <g mask="url(#d)" fillRule="evenodd" clipRule="evenodd">
          <path
            d="M66.908 54.615c-3.906 7.56-12.771 13.297-21.819 13.503v-1.024a25.33 25.33 0 0 1 .165-3.683c.124-1.072.29-2.13.413-3.202.302-2.721.151-4.865-.77-7.477-.399-1.14-1.224-2.033-2.228-2.666-.37-.233-1.388-.77-1.828-.797-.66 0-1.884-.467-2.434-.797-1.54-.907-1.911-2.295-.935-3.848 1.471-2.337 5.225-4.123 7.796-4.81 2.379-.633 5.142-.811 7.439.247l.151.069.069.151a140.296 140.296 0 0 1 1.498 3.285c.386.88.798 1.8 1.128 2.72.358 1.018.66 2.049 1.018 3.066 1.058 3.037 2.502 5.882 6.256 5.263.949-.165 1.925-.26 2.887-.178l1.194.178Z"
            fill="#000"
          />
          <path
            d="M66.511 55.028c-1.375 2.543-4.07 4.632-6.243 6.515a24.195 24.195 0 0 1-6.614 4.081c-2.516 1.031-5.267 2.25-8.127 2.361v-.917c-.192-5.511 1.87-8.576-.22-14.5-.99-2.776-4.07-3.765-4.495-3.765-.427 0-4.91-.894-2.998-3.945 1.911-3.05 9.694-6.665 14.671-4.398 0 0 2.008 4.247 2.599 5.951 1.361 3.89 2.406 9.524 7.782 8.617.935-.137 2.752-.069 3.645 0Z"
            fill="#B99D85"
          />
          <path
            d="M51.918 51.628s-.206 1.636-.509 2.35c-.302.715-.701 1.278-.701 1.278s.701-.453 1.031-1.374c.316-.907.179-2.254.179-2.254ZM52.34 53.525s-.37 1.196-.632 1.773c-.247.577-.398.893-.398.893s.357-.343.728-1.113c.358-.783.303-1.553.303-1.553ZM42.686 24.936c-.935.756-2.118 1.346-3.355 1.1-.44-.083-.99-.317-1.306-.647a40.223 40.223 0 0 1-1.045-1.127 68.128 68.128 0 0 1-2.42-2.803c-.894-1.086-1.637-2.337-2.242-3.615a20.519 20.519 0 0 1-1.114-2.804c-.137-.425-.247-.852-.37-1.278a57.726 57.726 0 0 1-.537-2.061L30.118 11l.688.22c.536.165 1.155.536 1.58.88.634.494 1.252.975 1.87 1.498a64.168 64.168 0 0 1 3.466 3.23c.481.48.921.975 1.334 1.51a31.419 31.419 0 0 1 2.695 4.096c.357.646.728 1.333 1.031 2.007l.124.289-.22.206Z"
            fill="#000"
          />
          <path
            d="M42.423 24.627s-2.13-4.632-4.991-7.49c-2.86-2.859-4.565-4.137-5.294-4.7-.729-.578-1.457-.811-1.457-.811s.536 2.143.907 3.312c.358 1.168 1.458 4.054 3.286 6.28 1.83 2.227 3.438 3.903 3.438 3.903s1.526 1.58 4.111-.494Z"
            fill="#B99D85"
          />
          <path
            d="M30.787 12.049c.179.673.536 2.048.797 2.9.358 1.168 1.458 4.054 3.287 6.28 1.828 2.227 3.437 3.903 3.437 3.903s.316.316.894.481a205.199 205.199 0 0 0-2.53-3.105c-.894-1.059-1.952-2.35-2.448-3.89-.495-1.54-.426-2.35-.426-2.35s2.613 3.752 2.901 4.33c.234.466 2.572 3.916 3.383 5.098.096-.014.206-.028.316-.041l.234-2.117s-1.389-1.883-2.241-3.298c-.839-1.416-2.393-3.271-4.331-4.66-1.458-1.057-2.764-2.432-3.273-3.531Z"
            fill="#9E775C"
          />
          <path
            d="M39.936 25.119s-.646-1.952-1.746-3.931c-1.1-1.98-1.72-2.79-2.462-3.532-.742-.742-2.543-1.952-2.543-1.952s.192.303.357.509c.151.206.261.275.261.275s.674 1.869.894 2.57c.206.7.894 1.965 1.526 2.597.633.632 2.022 2.35 2.297 2.735.288.357.618 1.127 1.416.729Z"
            fill="#000"
          />
          <path
            d="M39.416 24.807c-.096-.261-.206-.522-.303-.77-.37-.907-.783-1.8-1.264-2.666-.688-1.237-1.39-2.432-2.393-3.45-.289-.288-.646-.563-.976-.824 0 0-.014-.014-.028-.014.083.22.151.44.234.66.137.385.275.783.399 1.182.22.728.893 1.896 1.43 2.432.385.385.756.839 1.114 1.251.26.302.508.605.756.92.165.207.33.4.481.606.11.15.206.316.316.467.083.096.151.178.234.206Z"
            fill="#F6C4B1"
          />
          <path
            d="M37.265 36.35a21.562 21.562 0 0 1-.11-.935 35.22 35.22 0 0 1-.165-2.048c-.027-.66-.041-1.374.028-2.047.082-.646.165-1.306.261-1.952.165-1.044.44-2.405 1.018-3.298a1.23 1.23 0 0 1 .206-.261c.632-.66 1.678-.674 2.461-.275 1.114.563 1.568 1.759 1.595 2.94.041 1.224.124 2.475-.137 3.67-.537 2.42-2.434 3.683-4.634 4.522l-.468.178-.055-.494Z"
            fill="#000"
          />
          <path
            d="M37.658 36.268s-.44-3.23-.234-4.934c.206-1.69.481-3.917 1.224-5.085.742-1.168 3.437-.77 3.533 2.212.083 2.983.468 5.91-4.523 7.807Z"
            fill="#B99D85"
          />
          <path
            d="M37.452 34.278c-.082-.99-.123-2.13-.027-2.928.123-1.017.275-2.24.536-3.298.206-.124.399-.22.509-.261.385-.138.811-.275.907-.275.083.014.344.014.385.014.042 0 1.045-.083 1.554 1.223 0 0-.275-.234-.908-.179-.632.055-1.223.275-1.484.577-.262.303-.317.756-.317.756s.619-.797 1.32-.715c.702.083.867.495.867.495s-.468-.343-1.018-.178c-.536.165-.839.604-1.004.866-.165.26.316 3.38.316 3.38s-.687.619-1.636.523Z"
            fill="#9E775C"
          />
          <path
            d="M28.27 50.15s-.949-2.377-.798-4.851c.165-2.474-2.695-4.893-1.65-5.965 1.045-1.086 4.675-.99 5.913-.756 1.237.22 8.635 3.395 11.839.124 3.203-3.271 3.657-4.123 3.657-4.123s3.08-.44 1.361 5.84c-1.719 6.282-7.466 8.577-9.776 9.429-2.324.838-9.034 1.828-10.546.302Z"
            fill="#E30613"
          />
          <path
            d="M29.451 45.19a.595.595 0 0 1 .248-.124c.192-.055.398-.082.591-.11.302-.055.605-.096.907-.123.344-.028.73-.055 1.073-.014.413.041.756.233 1.004.577.041.055.082.124.123.192.152-.275.358-.453.77-.59.11-.042.262-.055.386-.07.192-.027.37-.04.563-.054.495-.041.99-.055 1.485-.083.812-.027 1.61-.055 2.42-.069.303 0 .605-.013.894-.04.632-.056 1.279-.152 1.898-.317.508-.137 1.058-.33 1.484-.632a8.177 8.177 0 0 1 1.788-1.003c.206-.083.481-.165.701-.193l.303-.027.014.302c0 .165 0 .344-.028.523a7.52 7.52 0 0 1-.22 1.237c-.33 1.223-.976 2.308-2.008 3.078-.632.481-1.375.88-2.09 1.21-.962.44-1.98.81-3.01 1.112-.468.138-.95.275-1.417.4l-.165.04-.11-.137a3.851 3.851 0 0 1-.564-.907c-.014-.055-.041-.11-.055-.165-.027.069-.069.137-.11.22-.11.22-.289.55-.467.715l-.069.068-1.843.234-.096-.124c-.22-.275-.44-.66-.577-.976-.014-.04-.041-.096-.055-.137-.138.289-.303.55-.509.742-.138.124-.577.564-.756.618l-.096.028-.097-.028c-.206-.068-.399-.137-.591-.206-.138-.055-.275-.096-.399-.15-.124-.056-.288-.11-.344-.248-.055-.11-.123-.22-.178-.33-.083-.165-.165-.33-.234-.508-.069.22-.165.426-.261.604-.495.88-1.39.962-1.994.138-.11-.165-.22-.344-.316-.509a7.584 7.584 0 0 1-.564-1.168 3.893 3.893 0 0 1-.179-.66c-.096-.536-.275-1.567.234-1.965.055-.041.096-.082.151-.124.275-.233.62-.316.963-.385.275-.055.605-.123.893-.11.18-.027.413.028.51.248Z"
            fill="#000"
          />
          <path
            d="M27.958 49.67s-.825-1.169-1.018-2.227c-.192-1.044-.096-1.512.124-1.69.234-.18.247-.303.99-.454.743-.165 1.086-.137 1.141.028.055.165.152.852.22 1.154.07.302.344.907.344.907s-.151-.618-.192-1.127c-.042-.508-.11-.838.206-.92.302-.083 1.677-.33 2.461-.248.784.082 1.017.77 1.017 1.072 0 .302.056 1.264.056 1.264s.068-.92.178-1.305c.11-.385.207-.688.757-.852.55-.179 4.757-.261 4.757-.261s2.984 0 4.441-1.045c1.458-1.045 2.352-1.14 2.352-1.14s.096 2.913-2.132 4.603c-2.227 1.677-6.421 2.666-6.421 2.666s-.371-.44-.509-.824c-.137-.385-.275-.921-.275-.921s-.178.467-.412.948c-.234.468-.413.646-.413.646l-1.595.193s-.316-.399-.55-.921c-.234-.522-.33-.907-.33-.907s-.137.893-.687 1.415c-.55.523-.66.564-.66.564s-1.142-.385-1.169-.44c-.027-.069-.275-.453-.509-1.058-.233-.605-.275-.673-.275-.673s-.014.77-.399 1.47c-.357.674-1.017.742-1.498.083Z"
            fill="#fff"
          />
          <path
            d="M26.62 40.353c.082-.261.344-.536.55-.7.66-.496 1.581-.605 2.379-.564l.206.014.055.206c.055.192.082.426.096.632a4.73 4.73 0 0 1-.096 1.456c-.11.495-.206 1.004-.302 1.498-.124.66-.248 1.32-.358 1.993l-.014.097-.069.068a2.577 2.577 0 0 1-1.058.536c-.715.18-1.691-.137-2.118-.756-.467-.687-.192-1.924.014-2.666.055-.179.11-.37.179-.55.151-.425.343-.852.536-1.264Z"
            fill="#000"
          />
          <path
            d="M29.531 39.382s.234.907 0 1.952c-.233 1.045-.66 3.505-.66 3.505s-.385.343-.935.48c-.55.138-1.43-.082-1.814-.646-.386-.55-.166-1.648.04-2.432.22-.77.716-1.773.716-1.773s.343-1.195 2.653-1.086Z"
            fill="#fff"
          />
          <path
            d="M31.52 39.463c.468-.11.95-.042 1.39.165.274.123.632.37.797.646.206.357.22 1.277.22 1.704 0 .838.041 2.652-.385 3.325a2.21 2.21 0 0 1-.495.578c-.55.44-1.306.412-1.966.33-.564-.083-1.898-.317-2.104-.99a2.138 2.138 0 0 1-.027-.59c.013-.276.027-.565.055-.84.04-.357.082-.755.164-1.098.083-.33.166-.674.262-1.004.11-.385.275-.866.495-1.21.275-.425 1.072-.824 1.54-1.003l.014-.013h.04Z"
            fill="#000"
          />
          <path
            d="M31.585 39.735s-1.114.44-1.403.907c-.302.453-.564 1.498-.715 2.116-.151.619-.275 2.117-.193 2.378.083.275.605.604 1.87.783 1.266.179 1.774-.123 2.173-.77.399-.645.344-2.968.344-3.174 0-.22-.014-1.264-.193-1.567-.192-.316-.99-.88-1.883-.673Z"
            fill="#FDE100"
          />
          <path
            d="M31.59 39.735s-.839.33-1.251.728c.674 0 1.746.096 2.145.673.536.77.33 3.505-.605 4.825.742-.028 1.128-.317 1.444-.811.398-.646.343-2.97.343-3.175 0-.22-.013-1.264-.192-1.567-.192-.316-.99-.88-1.884-.673Z"
            fill="#FAC200"
          />
          <path
            d="M33.336 45.435c.028-.48.055-.976.096-1.457.028-.275.042-.535.07-.81.013-.193.04-.4.082-.591.123-.55.192-.853.55-1.306.22-.289.591-.563.949-.674.563-.22 1.182-.288 1.732-.027.358.165.674.467.825.838.055.138.096.316.138.509.178-.234.44-.468.66-.619.316-.206.7-.37 1.086-.302.577.11 1.113.371 1.416.893.096.165.179.372.247.564.22-.413.495-.949.812-1.21.453-.37 1.224-.316 1.608.124.056.055.11.124.152.206.041-.178.082-.37.137-.55l.165-.577c.028-.096.055-.206.096-.316.07-.165.33-.302.482-.371.275-.11.577-.15.866-.069.247.056.481.165.66.358.124.123.193.26.289.412.22.316.385 1.086.426 1.484.014.165.041.33.055.509a4.38 4.38 0 0 1 0 .852c-.083.77-.399 1.457-1.004 1.965-.343.289-.921.729-1.416.66a.675.675 0 0 1-.371-.179c-.11.11-.317.207-.426.275-.413.206-1.65.426-2.118.426-.302 0-.605-.069-.797-.247a.703.703 0 0 1-.262.302c-.234.165-.522.22-.797.234-.316.014-.66 0-.977-.028a8.446 8.446 0 0 1-.825-.11c-.206-.041-.508-.11-.605-.343-.013-.041-.027-.083-.04-.138a1.175 1.175 0 0 1-.303.289c-.22.11-.564.11-.811.11a17.434 17.434 0 0 1-1.486-.124c-.384-.041-.948-.151-1.21-.453-.123-.165-.192-.344-.15-.509Z"
            fill="#000"
          />
          <path
            d="M35.16 40.864s-.496.164-.812.59c-.33.427-.385.66-.495 1.196-.124.536-.247 2.845-.247 2.845s-.166.454 1.113.605c1.279.151 1.898.165 2.145.041.248-.124.633-.92.633-.92s.027.728.096.934c.083.206 1.512.33 2.117.302.606-.027.825-.302.84-.453.013-.151.04-.646.068-1.127.014-.495.014-.536.014-.536s.206.934.206 1.305c0 .371.303.523.742.523.44 0 1.65-.234 1.98-.4.33-.164.372-.233.372-.233s.137-.247.123-.728c-.027-.467-.027-.632-.027-.632s.165.37.22.673c.041.303.028.619.028.619s.206.632 1.443-.413c1.238-1.044.894-2.68.853-3.078-.041-.399-.22-1.113-.385-1.347-.165-.248-.275-.522-.798-.646-.508-.124-.99.206-1.017.275-.028.069-.371 1.182-.427 1.608-.04.426-.013.715-.013.715s-.303-.647-.605-1.004c-.303-.343-.894-.357-1.21-.096-.317.261-.674 1.017-.825 1.292a1.838 1.838 0 0 0-.193.508s-.261-.893-.453-1.236c-.193-.344-.564-.633-1.224-.756-.647-.124-1.389.645-1.581.975-.193.33-.303.729-.303.729s-.028-1.017-.206-1.457c-.152-.467-.867-1.196-2.173-.673Z"
            fill="#fff"
          />
          <path
            d="M39.846 29.845c1.03-.041 1.87.88 1.87 2.062.013 1.168-.812 2.157-1.843 2.185-1.031.041-1.87-.88-1.87-2.062 0-.178.014-.357.055-.522 0 0 .096-1.1.454-1.718.371-.618.962-.632 1.114-.66.15-.027.495 0 .742.138.247.124.261.261.261.261s-.371-.316-.962-.22-.866.385-.99.674a2.072 2.072 0 0 0-.151.522 1.918 1.918 0 0 1 1.32-.66Z"
            fill="#000"
          />
          <path
            d="M39.857 30.08c.88-.028 1.608.797 1.622 1.841.014 1.045-.701 1.924-1.58 1.952-.88.027-1.61-.797-1.623-1.842-.014-1.044.687-1.924 1.581-1.951Z"
            fill="#fff"
          />
          <path
            d="M40.028 30.89c.508-.013.92.44.935 1.032.013.577-.4 1.071-.908 1.085-.508.014-.921-.44-.935-1.03 0-.578.413-1.072.908-1.086Z"
            fill="#000"
          />
          <path
            d="M40.113 31.478c.137 0 .261.151.275.357 0 .193-.11.357-.248.357-.137 0-.26-.15-.275-.357 0-.206.11-.357.248-.357Z"
            fill="#fff"
          />
          <path
            d="m52.589 33.468-.77-.014c.206.124.398.262.577.44.413.399.729.894.976 1.388.481.962.688 2.186.66 3.258-.055 1.745-.715 3.325-1.787 4.686-1.142 1.415-2.668 2.488-4.318 3.216-.55.247-1.114.467-1.691.632a6.532 6.532 0 0 1-.701.179l-.413.082c-.481.523-.976.976-1.416 1.25-.192.11-.371.248-.55.372-.275.193-.536.371-.811.563-.756.509-1.526.976-2.338 1.375-2.282 1.154-4.716 1.786-7.287 1.8-1.856.014-4.304-.137-5.981-1.017-.894-.48-1.65-1.223-1.76-2.267-.083-.715.22-1.361.687-1.897.165-.179.33-.358.523-.509a2.24 2.24 0 0 1 .288-.22l.358-.22c.165.88.371 1.609.797 2.296l.138.11a.105.105 0 0 0 .055.013c.344.097.701.179 1.045.262.11.027.22.04.33.068.233.041.48.07.729.096.77.097 1.553.138 2.337.152 2.214.027 4.51-.248 6.614-.976 3.052-1.058 5.692-2.639 7.136-5.635.193-.398.358-.825.509-1.237a15.87 15.87 0 0 0 .797-4.013v-.082c0 .014 0 .014-.014.027-.343 1.265-1.017 2.405-2.076 3.189-2.035 1.525-4.455 1.676-6.861 1.195-.577-.11-1.155-.274-1.733-.426-.728-.192-1.443-.398-2.172-.605a82.048 82.048 0 0 0-1.953-.508 15.91 15.91 0 0 0-1.608-.316 9.792 9.792 0 0 0-2.613 0 5.801 5.801 0 0 0-1.196.289l-.289.302c-.123.192-.275.44-.357.66a15.82 15.82 0 0 0-.372 1.14l-.15.495-.345-.275a4.056 4.056 0 0 1-.92-.893c-.537-.742-.66-1.594-.29-2.433.454-1.003 1.417-1.553 2.49-1.855l.054-.151a3.435 3.435 0 0 1 .523-.921.48.48 0 0 1-.083-.193v-.055c0-.054-.013-.123-.013-.192 0-.206.013-.399.04-.605.097-.59.4-1.113.936-1.388a2.11 2.11 0 0 1 1.444-.22c.192.042.44.124.604.248l.11.082c.812-.357 1.692-.618 2.572-.687.811-.055 1.65-.069 2.447.028.261.027.592.082.853.165l.797.247c.055.014.11.014.165.028l.358-.083c.77-.192 1.938-.646 2.502-1.223.66-.674.963-1.897.976-2.818 0-.412-.04-.824-.137-1.209-.138-.495-.413-.907-.866-1.154a1.78 1.78 0 0 0-.647-.207l-.618-.04c-.784.22-1.595.302-2.406.137-1.114-.22-2.036-.839-2.366-1.952-.274-.92-.164-1.594.33-2.35.124.591.29.948.51 1.21.22.26.645.398.976.453.15.027.288.041.44.027.59-.027 1.182-.302 1.705-.577.66-.37 1.264-.797 1.91-1.182.33-.192.688-.384 1.046-.536-.069 0-.138.014-.206.028a8.408 8.408 0 0 0-1.17.247l-1.704.468 1.333-1.155c.248-.22.592-.426.88-.59.688-.372 1.444-.633 2.228-.702a6.058 6.058 0 0 1 1.224 0h-.014l-.839-.838 1.17.165c.233.027.522.137.741.22a5.506 5.506 0 0 1 1.582 1.03c.234.22.44.454.632.715.372.467.688.976.976 1.498 0 .014.014.014.014.027.07-.137.138-.288.207-.426.26-.535.522-1.072.797-1.594.248-.48.509-.948.798-1.402.233-.37.508-.77.825-1.072.412-.384.976-.742 1.457-1.03a32.63 32.63 0 0 1 2.049-1.141 46.51 46.51 0 0 1 3.011-1.443c.715-.302 1.485-.619 2.227-.81.4-.11 1.018-.248 1.362.054.399.357.11 1.072-.069 1.47-.316.688-.756 1.389-1.21 2.007a27.328 27.328 0 0 1-1.801 2.2c-.839.906-1.733 1.772-2.709 2.542a14.478 14.478 0 0 1-2.118 1.401c-.7.371-1.443.797-2.117 1.265l-.041.206a10.12 10.12 0 0 0-.165.934c-.11.674-.206 1.361-.261 2.048-.056.66-.097 1.663.096 2.295.412 1.292 1.279 1.897 2.379 2.364Z"
            fill="#000"
          />
          <path
            d="M47.893 24.505s-.825-1.814-1.898-2.817c-1.072-1.017-2.103-1.155-2.103-1.155s.495.495.646.742c.151.248.137.33.137.33s-.577-.563-2.255-.398c-1.69.165-2.873 1.195-2.873 1.195s1.059-.288 1.8-.302c.743-.014 1.129.509 1.129.509s-.784-.124-2.283.783c-1.499.907-2.874 2.048-4.331 1.787-1.444-.261-1.43-1.1-1.43-1.1s-.509 2.433 2.13 2.969c2.655.536 5.212-1.76 5.886-2.268.687-.495 1.664-.866 2.585-.838.921.027 1.237.384 1.237.384s-.88-.343-2.13.014c-1.252.358-1.527.742-2.036 1.113-.508.372-1.045.77-1.65 1.059-.605.288-.921.426-.921.426s1.444.082 1.87 1.663c.426 1.58-.055 3.518-.935 4.411-.867.894-2.695 1.333-2.695 1.333s.715.55.77 1.278c.055.715-.399 1.169-.399 1.169s.385-1.416-.22-1.952c-.591-.536-1.086-.522-1.856-.302-.77.22-1.719.783-1.719.783s.11-.288.55-.605c.44-.302 1.348-.577 1.348-.577s-1.045-.33-3.163-.178c-2.117.15-4.125 1.594-4.125 1.594s.275-.399.646-.687c.372-.289.55-.358.55-.358s-.673-.494-1.636 0c-.948.495-.756 1.856-.756 1.856l.495-.152s-.454.55-.646.839c-.193.289-.303.59-.303.59s1.581-.357 3.259-.178 2.626.701 2.626.701-1.98-.453-3.575-.44c-1.595.014-4.111.289-4.854 1.965-.756 1.677 1.06 2.832 1.06 2.832s.26-.811.384-1.141c.124-.33.399-.756.399-.756s-.371.179-.66.385c-.289.206-.371.343-.371.343s-.097-.274.783-.865 2.695-.866 4.634-.619c1.953.248 5.817 1.512 7.48 1.856 1.664.33 4.277.577 6.545-1.127 2.269-1.69 2.173-4.687 2.173-4.687s-.289.028-.523.22c-.247.192-.289.398-.289.398s-.123-.467.66-.838c.784-.37 1.898.495 1.898.495s-.33-.11-.646-.192c-.33-.083-.523-.028-.523-.028s.206 2.928-.852 5.95c-1.045 3.024-3.121 5.47-7.893 7.12-4.77 1.65-9.803.783-10.23.674-.426-.11-1.512-.33-1.98-.646-.454-.303-.399-.605-.399-.605s.166.178.386.33c.22.15.577.316.577.316s-.413-.852-.522-1.251l-.18-.646s-1.43.935-1.278 2.213c.137 1.278 1.554 2.968 7.342 2.941 5.79-.028 9.57-3.312 10.78-4.054 1.224-.742 2.93-3.106 3.782-4.48.839-1.375 1.196-2.227 1.196-2.227s-.399 1.374-1.031 2.487c-.619 1.114-1.98 2.832-1.98 2.832s4.015-.811 6.476-3.904c2.475-3.092 1.719-6.28 1.1-7.517s-1.21-1.58-1.705-1.855c-.495-.275-1.251-.303-1.251-.303s.44-.165.77-.15c.33.013.591.178.591.178s-1.1-.509-1.595-2.103c-.495-1.594.316-5.484.316-5.484l-.962.564s.467-.784 3.327-2.295c2.86-1.526 5.418-4.55 6.49-6.02 1.06-1.47 1.61-2.694 1.334-2.927-.275-.234-1.334.055-3.176.824-1.83.77-5.363 2.57-6.394 3.532-1.059.921-2.406 4.123-2.915 5.044Z"
            fill="#B99D85"
          />
          <path
            d="M47.874 24.466c-.11-.247-.894-1.841-1.87-2.776l-.014-.014c-1.072-1.017-2.104-1.154-2.104-1.154s.495.495.647.742c.15.248.137.33.137.33s-.577-.564-2.255-.399a5.175 5.175 0 0 0-1.224.275 2.313 2.313 0 0 0-.37.151c-.496.22-.88.468-1.087.619-.124.096-.192.151-.192.151l.247-.069c.303-.068.839-.192 1.306-.22.083 0 .165-.013.234-.013a1.467 1.467 0 0 1 1.128.509s-.207-.028-.606.054c-.11.028-.247.055-.398.11a6.924 6.924 0 0 0-1.045.467 2.352 2.352 0 0 0-.248.152c-.247.15-.48.302-.715.453-.11.069-.233.151-.344.22-.027.027-.068.041-.096.069a.555.555 0 0 1-.124.068c-.11.07-.233.138-.343.207-.083.04-.151.096-.234.137-.124.069-.261.137-.385.206a3.276 3.276 0 0 1-.385.179c-.578.247-1.141.37-1.719.261-1.444-.261-1.43-1.1-1.43-1.1s-.508 2.433 2.132 2.97c.425.082.852.095 1.264.054.152-.014.303-.041.454-.069.935-.178 1.815-.618 2.516-1.058.028-.014.056-.041.083-.055l.371-.247c.482-.33.866-.646 1.1-.825.041-.027.07-.055.096-.069.688-.494 1.664-.865 2.585-.838.674.014 1.018.22 1.17.316.247.055.412.083.412.083s-.427-.454-.812-.742c-.385-.29-1.182-.55-1.182-.55s1.045.082 1.787.453c.77.371 1.513.962 1.513.962Z"
            fill="#525251"
          />
          <path
            d="M42.82 27.477s.55-1.168 2.598-1.306c2.035-.137 2.392.44 2.805 1.141.399.715.426 1.65.289 2.116-.138.481-.44.646-.44.646s-1.389-1.759-2.544-2.212c-1.169-.44-1.705-.55-2.709-.385ZM37.936 34.873l-.04-.042c-.33-.302-.633-.426-.963-.44.096.193.357.536 1.003.482ZM41.135 26.113c-.22.138-.454.275-.702.4-.605.288-.921.425-.921.425s1.444.083 1.87 1.663c.426 1.58-.055 3.518-.935 4.412-.866.893-2.695 1.333-2.695 1.333s.247.192.454.495c.907-.22 2.09-1.086 2.763-1.828.729-.797 1.004-3.093.825-4.645a6.942 6.942 0 0 0-.66-2.255ZM49.702 30.5c-.165-1.814.453-4.742.453-4.742l-.962.564s.467-.784 3.328-2.295c2.86-1.526 5.417-4.55 6.49-6.02 1.058-1.47 1.608-2.694 1.333-2.927-.069-.055-.165-.083-.33-.083-.124.536-.344 1.141-.783 1.526-.922.81-3.204 2.034-3.204 2.034s-5.514 4.728-5.913 5.002c-.398.289-.921.756-1.279 1.856-.357 1.1.166 2.68.166 2.68l.165-1.113c-.014-.028.027 1.992.536 3.518Zm-2.627 10.802c-.055.192-.123.385-.192.577-1.045 3.024-3.121 5.47-7.893 7.12-.536.178-1.072.343-1.608.467-.702.88-1.403 1.786-2.049 2.624 4.304-.783 7.136-3.188 8.154-3.82 1.224-.742 2.928-3.106 3.781-4.48.839-1.375 1.196-2.227 1.196-2.227s-.399 1.374-1.031 2.487c-.619 1.114-1.98 2.832-1.98 2.832s4.015-.811 6.476-3.903c2.475-3.093 1.719-6.28 1.1-7.518-.619-1.237-1.21-1.58-1.705-1.855-.495-.275-1.251-.303-1.251-.303s.44-.164.77-.15c.33.013.591.178.591.178s-.426-.192-.866-.729a13.213 13.213 0 0 0-1.072-.178c-1.238-.165-1.843.096-1.843.096s-.44-1.993-1.306-2.474c-.866-.48-1.911-.041-1.911-.041s.178-.453.577-.577c.399-.124 1.114.014 1.114.014s-.688-.523-1.444-.344c-.743.179-1.114.151-1.636 2.35-.523 2.199.618 3.326.893 3.532.275.206-.55.866.11.839.66-.028 2.31-1.334 3.177-2.007.852-.687 1.787-1.1 3.698.893 1.898 1.98 1.032 5.127.11 6.597-.92 1.47-3.643 3.367-3.643 3.367s.48-.866.797-1.69c.316-.825.454-2.447.454-2.447s-.66.303-1.568.77Z"
            fill="#9E775C"
          />
          <path
            d="M38.12 34.727c.18.233.372.536.4.893.054.715-.4 1.168-.4 1.168s.386-1.415-.22-1.951c-.59-.536-1.085-.523-1.855-.303-.77.22-1.72.784-1.72.784s.11-.289.55-.605c.44-.302 1.348-.577 1.348-.577s-1.045-.33-3.162-.179c-2.118.151-4.125 1.594-4.125 1.594s.275-.398.646-.687c.371-.288.55-.357.55-.357s-.674-.495-1.636 0c-.949.495-.756 1.855-.756 1.855l.495-.15s-.454.549-.647.837c-.192.289-.302.591-.302.591s1.581-.357 3.258-.178c1.678.178 2.627.7 2.627.7s-1.98-.453-3.575-.44c-1.595.014-4.111.29-4.854 1.966-.756 1.677 1.059 2.831 1.059 2.831s.26-.81.385-1.14c.123-.33.398-.756.398-.756s-.37.178-.66.384c-.288.207-.37.344-.37.344s-.097-.275.783-.866c.88-.59 2.695-.866 4.634-.618 1.952.247 5.816 1.511 7.48 1.855 1.664.33 4.276.577 6.545-1.127 2.268-1.69 2.172-4.686 2.172-4.686s-.289.027-.522.22c-.248.192-.289.398-.289.398s-.124-.467.66-.838c.784-.371 1.897.495 1.897.495s-.33-.11-.646-.193c-.33-.082-.522-.027-.522-.027s.206 2.927-.853 5.95c-1.045 3.024-3.12 5.47-7.892 7.12-4.772 1.649-9.804.783-10.23.673-.427-.11-1.513-.33-1.98-.646-.454-.302-.4-.605-.4-.605s.166.179.386.33c.22.151.578.316.578.316s-.413-.852-.523-1.25l-.179-.646s-1.43.934-1.279 2.212c.138 1.278 1.554 2.969 7.343 2.941 5.789-.027 9.57-3.312 10.78-4.054 1.072-.66 2.53-2.57 3.437-3.958.413-.7.867-1.457 1.197-2.062.233-.453.33-.7.33-.7l-.014.04c.605-1.428 1.54-4.658.467-6.17-1.237-1.745-3.025.44-4.028.646-1.004.206-2.764.632-5.184-.66-.468-.275-1.017-.508-1.581-.714Z"
            fill="#F2E2CF"
          />
          <path
            d="M25.739 48.097c-.248.358-.426.798-.371 1.292.137 1.279 1.553 2.97 7.342 2.941 5.789-.027 9.57-3.312 10.78-4.054.66-.398 1.458-1.278 2.2-2.212-.371.275-.797.59-1.265.92-2.667 1.91-3.011 1.938-4.413 2.64-1.403.7-8.32 2.583-11.812 1.277-1.98-.77-2.447-1.938-2.461-2.804ZM48.55 36.045c-.096-.028-.192-.055-.302-.083-.33-.082-.523-.027-.523-.027s.179 2.57-.66 5.373c.193-.412.372-.893.482-1.388.302-1.374.55-3.38.728-3.697a.367.367 0 0 1 .275-.178Zm-2.214.316c.028-.165.138-.454.674-.701.591-.289 1.375.151 1.719.371.138 0 .247.041.247.041s-.852-1.195-2.035-.687c-1.182.509-1.196 1.54-1.196 1.54s.069-.18.399-.454c.082-.055.137-.083.192-.11ZM24.57 40.73c.151 1.072 1.224 1.76 1.224 1.76s.261-.812.385-1.141c.124-.33.399-.756.399-.756s-.372.178-.66.384c-.29.207-.372.344-.372.344s-.096-.275.784-.866c.88-.59 2.695-.865 4.634-.618 1.953.247 5.816 1.512 7.48 1.855 1.664.33 4.276.578 6.545-1.127 2.269-1.69 2.172-4.686 2.172-4.686s-.288.027-.522.22a.757.757 0 0 0-.206.233c.178-.055.289.028.289.028s.137.165.027.55c-.11.398-.743 1.937-1.719 2.762a6.964 6.964 0 0 1-6.38 1.32c-3.038-.867-8.14-2.474-10.835-1.856-1.609.357-2.654 1.072-3.245 1.594Zm3.465-4.288a7.471 7.471 0 0 0-.454.591c-.192.289-.302.591-.302.591s1.581-.357 3.259-.178c.88.096 1.554.274 1.993.44.84.164 1.403.33 1.403.33s-1.292-.647-3.025-1.224c-1.389-.467-2.475-.536-2.874-.55Zm.976-2.13c-.165.028-.33.096-.522.179-.949.494-.756 1.855-.756 1.855l.33-.096.536-.536s-.22-.165-.083-.646c.07-.248.29-.522.495-.756Zm5.115 2.199s1.045-1.54 2.31-1.58c1.265-.042 1.458.948 1.403 1.442-.069.495-.468.852-.468.852s-2.557.51-3.245-.714Z"
            fill="#EDC9A2"
          />
          <path
            d="M34.432 36.416s.742-.962 1.842-1.113c1.1-.165 1.238.755 1.279 1.03.041.289-.344.674-.344.674v-.509s-.55.316-1.21.193c-.646-.124-.907-.509-.907-.509s-.413.069-.66.234ZM43.057 27.076s1.03-1.306 2.9-1.292c1.87.014 2.352 2.047 2.325 2.542-.028.495-.29 1.416-.29 1.416s-.356-1.058-1.938-2.158c-1.581-1.085-2.764-.536-2.997-.508ZM49.04 24.952s.563-1.54 1.36-2.64c.798-1.112 1.733-2.28 3.81-3.394 2.075-1.113 4.427-1.8 4.427-1.8s-.166.316-.482.44c-.33.123-.453.26-.453.26s-1.265 1.787-2.187 2.612c-.921.825-2.654 2.281-3.836 2.996-1.155.687-2.64 1.526-2.64 1.526Z"
            fill="#000"
          />
          <path
            d="M57.01 18.097c-.88.343-1.76.728-2.6 1.168a9.983 9.983 0 0 0-2.296 1.635c-.522.509-.948 1.059-1.375 1.65-.096.137-.192.288-.288.426a9.53 9.53 0 0 0-.564 1.044c.536-.316 1.072-.618 1.608-.948.633-.385 1.252-.852 1.843-1.32a44.52 44.52 0 0 0 1.925-1.621 8.88 8.88 0 0 0 .853-.907c.302-.358.605-.742.893-1.127-.013.013 0 0 0 0Z"
            fill="#F6C4B1"
          />
          <path
            d="M45.108 29.894c1.14 0 2.062 1.182 2.062 2.653 0 1.456-.921 2.652-2.063 2.652-1.14 0-2.062-1.182-2.062-2.652 0-.22.027-.44.069-.646 0 0 .11-1.375.522-2.13.413-.756 1.072-.743 1.252-.77.164-.014.55.027.824.206.262.178.29.343.29.343s-.413-.412-1.06-.33c-.66.083-.962.44-1.1.798a3.383 3.383 0 0 0-.178.646c.357-.468.88-.77 1.444-.77Z"
            fill="#000"
          />
          <path
            d="M45.11 30.183c.976 0 1.774 1.058 1.774 2.364 0 1.306-.798 2.364-1.774 2.364s-1.774-1.059-1.774-2.364c0-1.306.798-2.364 1.774-2.364Z"
            fill="#fff"
          />
          <path
            d="M45.169 30.881c.564 0 1.017.564 1.017 1.265 0 .7-.453 1.264-1.017 1.264-.564 0-1.018-.563-1.018-1.264 0-.687.454-1.265 1.018-1.265Z"
            fill="#000"
          />
          <path
            d="M45.194 31.343c.165 0 .289.165.289.357 0 .192-.124.357-.29.357-.164 0-.288-.165-.288-.357 0-.206.138-.357.289-.357Z"
            fill="#fff"
          />
          <path
            d="M44.476 35.954s-.137-.302.578-1.388c.715-1.072 2.117-1.58 2.667-1.745.55-.151 1.128-.151 1.348-.041.22.096.22 1.003-1.018 1.539-1.237.536-1.773.797-2.227 1.058-.468.261-1.142.756-1.348.577Z"
            fill="#B99D85"
          />
          <path
            d="M44.502 35.715c.041-.206.192-.564.563-1.127.716-1.072 2.118-1.58 2.668-1.746.55-.15 1.128-.15 1.348-.041.11.055.165.289.054.577-.797-.288-1.36.028-1.897.454-.715.563-1.953 1.54-2.736 1.883Z"
            fill="#9E775C"
          />
          <path
            d="M44.466 35.772s.11-1.347 1.595-2.364c1.499-1.017 2.75-.673 2.75-.673s-2.75 0-4.345 3.037Z"
            fill="#000"
          />
          <path
            d="M47.38 34.04s.07-.536.785-.797c.715-.248 1.017-.083 1.017-.083s-1.224.261-1.801.88ZM47.99 34.163s.096-.426.824-.605c.729-.178.867.07.867.07s-1.06.109-1.692.535ZM49.404 34.155s.261-.247.523-.15a.543.543 0 0 1 .316.288s-.55-.18-.839-.138ZM37.845 28.013s.068-.756 1.127-.976c1.059-.22 1.678.454 1.898.701.22.248.385.687.426.907.04.234.082.385.082.385s-.302-.866-1.485-.866c-1.182 0-1.91 1.375-2.035 1.663-.124.289-.399.907-.399.907s-.192-1.237.386-2.72Z"
            fill="#000"
          />
          <path
            d="M30.827 40.967s-.027.371-.165 1.237c-.137.866-.302 1.622-.123 2.282.178.66-.468.865-.73.48-.26-.384-.11-1.264-.054-1.69.069-.44.357-1.635.44-1.841.082-.207.261-.866.632-.468Z"
            fill="#fff"
          />
          <path
            d="m30.392 35.444.275 4.878 3.657-3.257-3.258 3.642 4.88.275-4.88.275 3.259 3.642-3.658-3.257-.275 4.892-.261-4.892-3.658 3.257 3.259-3.642-4.881-.275 4.88-.275-3.258-3.642 3.658 3.257.26-4.878ZM45.965 36.47l.206 3.67 2.737-2.446-2.448 2.735 3.671.206-3.67.207 2.447 2.734-2.736-2.446-.207 3.67-.206-3.67-2.736 2.446 2.447-2.734-3.671-.207 3.671-.206-2.447-2.735 2.736 2.447.206-3.67Z"
            fill="#fff"
          />
          <path
            d="M45.542 67.077v.908c2.86-.11 5.61-1.32 8.127-2.35l.578-.248c-1.857-.948-3.465-2.57-4.03-5.264-1.622-7.779.784-12.328 1.472-15.557.055-.248.096-.522.124-.811-1.073 1.168-2.434 2.061-3.878 2.707-.55.248-1.114.467-1.691.633-.234.068-.468.137-.702.178l-.412.083c-.481.522-.976.975-1.416 1.25-.192.11-.371.248-.55.371l-.66.454c1.031.577 2.269 1.567 2.819 3.147l.04.124c0 .014.015.027.015.041.014.027.014.041.027.069 0 .013.014.041.014.055 0 .013.014.04.014.055 0 .027.014.04.027.069 0 .013.014.04.014.054 0 .014.014.028.014.041.041.124.082.262.11.4v.027c.013.04.027.082.027.123v.014c.014.028.014.069.028.096l.014.07.013.04c0 .028.014.055.014.083l.027.123.014.07.014.068v.014l.014.082v.137l.013.083v.014c.014.04.014.068.028.11v.068l.041.193v.027l.014.055.014.096.013.042.014.068.014.083v.013l.014.11v.014l.014.124.013.123v.042l.014.11v.055l.014.11V56l.014.083.013.082.014.124c.014.082.014.15.027.233v.11c0 .055.014.124.014.179v.082l.014.11c.357 3.546-.66 6.597-.537 10.074Z"
            fill="#9E775C"
          />
        </g>
        <defs>
          <linearGradient
            id="a"
            x1={35}
            y1={12}
            x2={94.5}
            y2={67}
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#656565" />
            <stop offset={1} stopColor="#C4C4C4" stopOpacity={0} />
          </linearGradient>
          <linearGradient
            id="c"
            x1={15}
            y1={21}
            x2={66.5}
            y2={58.5}
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#FFC406" />
            <stop offset={1} stopColor="#FFF037" />
          </linearGradient>
          <filter
            id="b"
            x={0}
            y={0}
            width={82}
            height={82}
            filterUnits="userSpaceOnUse"
            colorInterpolationFilters="sRGB"
          >
            <feFlood floodOpacity={0} result="BackgroundImageFix" />
            <feColorMatrix
              in="SourceAlpha"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
              result="hardAlpha"
            />
            <feOffset dy={4} />
            <feGaussianBlur stdDeviation={2} />
            <feComposite in2="hardAlpha" operator="out" />
            <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
            <feBlend
              in2="BackgroundImageFix"
              result="effect1_dropShadow_12814_37710"
            />
            <feBlend
              in="SourceGraphic"
              in2="effect1_dropShadow_12814_37710"
              result="shape"
            />
          </filter>
        </defs>
      </svg>
    );
  };