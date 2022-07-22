export enum ArrowKey {
  ArrowUp = 'ArrowUp',
  ArrowDown = 'ArrowDown',
}

export enum NumberKey {
  Zero = '0',
  One = '1',
  Two = '2',
  Three = '3',
  Four = '4',
  Five = '5',
  Six = '6',
  Seven = '7',
  Eight = '8',
  Night = '9',
}

export enum OperateKey {
  Backspace = 'Backspace',
}

export const LegalKeys = { ...ArrowKey, ...NumberKey, ...OperateKey };
