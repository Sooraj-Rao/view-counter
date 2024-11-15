"use server";
import mongoose, { Connection } from "mongoose";

let cachedConnection: Connection | null = null;

export const ConnectDb = async () => {
  if (cachedConnection) {
    console.log("Using Cached DB connection");
    return cachedConnection;
  }
  const uri = process.env.MONGO_URI!;

  try {
    const conn = await mongoose.connect(uri);
    cachedConnection = conn.connection;
    console.log("Database connected");
    return cachedConnection;
  } catch (error) {
    return console.log("Database connection failed -->", error);
  }
};

/*{
  import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable inside .env.local');
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

export async function connectDB() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };

    cached.promise = mongoose.connect(MONGODB_URI!, opts).then((mongoose) => {
      return mongoose;
    });
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    throw e;
  }

  return cached.conn;
}
}*/







/*

// function generateSVG(views: number, options: SVGOptions): string {
//   const baseStyle = colorStyles[options.colorStyle] || colorStyles["1"];
//   const style = {
//     ...baseStyle,
//     bgColor: options.bgColor || baseStyle.bgColor,
//     textColor: options.textColor || baseStyle.textColor,
//     iconColor: options.iconColor || baseStyle.iconColor,
//     viewsBgColor: options.viewsBgColor || baseStyle.viewBgColor,
//     viewColor: options.viewsColor || baseStyle.viewColor,
//     gradientStart: options.gradientStart || baseStyle.gradientStart,
//     gradientEnd: options.gradientEnd || baseStyle.gradientEnd,
//   };

//   const scaledFontSize = options.fontSize * options.scale;
//   const scaledIconSize = options.iconSize * options.scale;
//   const scaledPadding = options.padding * options.scale;
//   const scaledGap = options.gap * options.scale;

//   const textWidth = options.text.length * scaledFontSize * 0.6;
//   const viewsTextWidth = Math.max(
//     (views.toString().length + 1) * scaledFontSize * 0.6,
//     60 * options.scale
//   );

//   const baseWidth =
//     scaledIconSize +
//     textWidth +
//     viewsTextWidth +
//     scaledPadding * 3 +
//     scaledGap * 2;
//   const width = Math.max(320, baseWidth);
//   const height = Math.max(50, scaledIconSize + scaledPadding * 2);

//   const scaledWidth = width * options.scale;
//   const scaledHeight = height * options.scale;
//   const scaledBorderRadius = options.borderRadius * options.scale;

//   const iconX = scaledPadding;
//   const iconY = (scaledHeight - scaledIconSize) / 2;
//   const textX = iconX + scaledIconSize + scaledGap;
//   const textY = scaledHeight / 2;
//   const viewsX = scaledWidth - viewsTextWidth - scaledPadding;
//   const viewsY = scaledPadding / 2;
//   const viewsHeight = scaledHeight - scaledPadding;
//   const viewsTextX = viewsX + viewsTextWidth / 2;
//   const viewsTextY = scaledHeight / 2;

//   return `
//     <svg xmlns="http://www.w3.org/2000/svg" width="${scaledWidth}" height="${scaledHeight}" viewBox="0 0 ${scaledWidth} ${scaledHeight}">
//       <defs>
//         <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="0%">
//           <stop offset="0%" style="stop-color:${
//             style.gradientStart
//           };stop-opacity:1" />
//           <stop offset="100%" style="stop-color:${
//             style.gradientEnd
//           };stop-opacity:1" />
//         </linearGradient>
//         <filter id="shadow">
//           <feDropShadow dx="0" dy="2" stdDeviation="2" flood-opacity="0.2"/>
//         </filter>
//       </defs>

//       <rect width="${scaledWidth}" height="${scaledHeight}" rx="${scaledBorderRadius}" fill="${
//     style.bgColor
//   }" filter="url(#shadow)" />

//       <svg x="${iconX}" y="${iconY}" width="${scaledIconSize}" height="${scaledIconSize}" viewBox="0 0 24 24" fill="none">
//         ${icons[options.icon](style.iconColor)}
//       </svg>

//       <text
//         x="${textX}"
//         y="${textY}"
//         font-family="${options.fontFamily}"
//         font-size="${scaledFontSize}"
//         fill="${style.textColor}"
//         font-weight="${options.fontWeight}"
//         dominant-baseline="central"
//       >${options.text}</text>

//       <rect
//         x="${viewsX}"
//         y="${viewsY}"
//         width="${viewsTextWidth}"
//         height="${viewsHeight}"
//         rx="${viewsHeight / 2}"
//         fill="${style.viewsBgColor}"
//       />

//       <text
//         x="${viewsTextX}"
//         y="${viewsTextY}"
//         font-family="${options.fontFamily}"
//         font-size="${scaledFontSize}"
//         fill="${style.viewColor}"
//         text-anchor="middle"
//         dominant-baseline="central"
//         font-weight="${options.fontWeight}"
//       >${views.toLocaleString()}</text>
//     </svg>
//   `;
// }
*/