export type Content = {
  received: string;
  expected: string;
};

export const cmsContentMock: Content[] = [
  {
    received: '<div>Lorem&nbsp;Ipsum</div>',
    expected: 'Lorem Ipsum',
  },
  {
    received: '<div>Lorem&lt;Ipsum</div>',
    expected: 'Lorem<Ipsum',
  },
  {
    received: '<div>Lorem&gt;Ipsum</div>',
    expected: 'Lorem>Ipsum',
  },
  {
    received: '<div>Lorem&amp;Ipsum</div>',
    expected: 'Lorem&Ipsum',
  },
  {
    received: '<div>&quot;Lorem Ipsum&quot;</div>',
    expected: '"Lorem Ipsum"',
  },
  {
    received: '<div>&apos;Lorem Ipsum&apos;</div>',
    expected: '\'Lorem Ipsum\'',
  },
  {
    received: '<div>&cent;50</div>',
    expected: '¢50',
  },
  {
    received: '<div>&pound;50</div>',
    expected: '£50',
  },
  {
    received: '<div>&yen;50</div>',
    expected: '¥50',
  },
  {
    received: '<div>&euro;50</div>',
    expected: '€50',
  },
  {
    received: '<div>&copy;Lorem Ipsum</div>',
    expected: '©Lorem Ipsum',
  },
  {
    received: '<div>Lorem Ipsum&reg;</div>',
    expected: 'Lorem Ipsum®',
  },
  {
    received: '<div>Lorem&#160;Ipsum</div>',
    expected: 'Lorem Ipsum',
  },
  {
    received: '<div>Lorem&#60;Ipsum</div>',
    expected: 'Lorem<Ipsum',
  },
  {
    received: '<div>Lorem&#62;Ipsum</div>',
    expected: 'Lorem>Ipsum',
  },
  {
    received: '<div>Lorem&#38;Ipsum</div>',
    expected: 'Lorem&Ipsum',
  },
  {
    received: '<div>&#34;Lorem Ipsum&#34;</div>',
    expected: '"Lorem Ipsum"',
  },
  {
    received: '<div>&#39;Lorem Ipsum&#39;</div>',
    expected: '\'Lorem Ipsum\'',
  },
  {
    received: '<div>&#162;50</div>',
    expected: '¢50',
  },
  {
    received: '<div>&#163;50</div>',
    expected: '£50',
  },
  {
    received: '<div>&#165;50</div>',
    expected: '¥50',
  },
  {
    received: '<div>&#8364;50</div>',
    expected: '€50',
  },
  {
    received: '<div>&#169;Lorem Ipsum</div>',
    expected: '©Lorem Ipsum',
  },
  {
    received: '<div>Lorem Ipsum&#174;</div>',
    expected: 'Lorem Ipsum®',
  },
  {
    received: '<div>a&#768;</div>',
    expected: 'à',
  },
  {
    received: '<div>a&#769;</div>',
    expected: 'á',
  },
  {
    received: '<div>a&#770;</div>',
    expected: 'â',
  },
  {
    received: '<div>a&#771;</div>',
    expected: 'ã',
  },
];
