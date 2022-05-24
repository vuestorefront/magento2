import type { LogEntryVariant } from './verbosity';

const createLogEntryVariantStyle = (backgroundColor: string, textColor: string) : string => `
  padding: 2px; 
  border-radius: 0 2px 2px 0; 
  background: ${backgroundColor};
  color: ${textColor};
`;

const colors = {
  white: '#fff',
  black: '#000',

  // Storefront UI colors
  success: '#5ece7b',
  danger: '#d12727',
  warning: '#ecc713',
  info: '#0468db',
} as const;

const defaultStyle = createLogEntryVariantStyle(colors.success, colors.white);

const logEntryVariantProperties : Record<LogEntryVariant, { prefixText: string, style: string }> = {
  error: {
    prefixText: '[error]',
    style: createLogEntryVariantStyle(colors.danger, colors.white),
  },
  warn: {
    prefixText: '[warn]',
    style: createLogEntryVariantStyle(colors.warning, colors.black),
  },
  info: {
    prefixText: '[info]',
    style: createLogEntryVariantStyle(colors.info, colors.white),
  },
  debug: {
    prefixText: '[debug]',
    style: defaultStyle,
  },
  none: {
    prefixText: '',
    style: defaultStyle,
  },
};

const isNode: boolean = Object.prototype.toString.call(typeof process !== 'undefined' ? process : 0) === '[object process]'
  || process.env.APPLICATION_ENV === 'production';

export const getStyledConsolePrefix = (logEntryVariant: LogEntryVariant) => {
  const { prefixText, style } = logEntryVariantProperties[logEntryVariant];
  const prefix = `[VSF]${prefixText}`;

  const nodeStyle = [`${prefix}: `];
  const browserStyle = [
    `%c${prefix}%c:`,
    style,
    'background: transparent;',
  ];

  return isNode ? nodeStyle : browserStyle;
};
