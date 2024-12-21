export const generateOutlinePrompt = (keyword: string, background?: string): string => {
  return `Based on the main keyword "${keyword}"${
    background ? ' and the following background information:\n\n' + background : ''
  }, generate an SEO-optimized outline that perfectly and directly addresses the search intent of a user searching for the main keyword, adds no fluff and is concise and to the point.`;
};

export const generateArticlePrompt = (
  keyword: string,
  outline: string,
  background?: string
): string => {
  return `Use markdown formatting, bolded words, lists and tables to write a 2000 word article based on the keyword "${keyword}", ${
    background ? 'the following background information:\n\n' + background + '\n\nand ' : ''
  }the following outline:\n\n${outline}`;
};