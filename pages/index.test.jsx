import React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import Index from './index';

describe('Markdown -> HTML test', () => {
  it("should render", () => {
    render(<Index />);
  });

  it('renders textarea element with correct classes', () => {
    const { container } = render(<Index />)
    const box1 = container.querySelector("#markdown");
    expect(box1).toBeInTheDocument();
    const box2 = container.querySelector("#html-output");
    expect(box2).toBeInTheDocument();
  })

  it('Parse Test #1 ', () => {
    const { container } = render(<Index />)
    const box1 = container.querySelector("#markdown");
    box1.value = '# Sample Document\n\nHello!\n\nThis is sample markdown for the [Mailchimp](https://www.mailchimp.com) homework assignment.';
    const button = container.querySelector(".button");
    button.click();
    const box2 = container.querySelector("#html-output");
    expect(box2.value).toBe('<h1>Sample Document</h1>\n<p>Hello!</p>\n<p>This is sample markdown for the <a href="https://www.mailchimp.com">Mailchimp</a> homework assignment.</p>')
  })

  it('Parse Test #2 ', () => {
    const { container } = render(<Index />)
    const box1 = container.querySelector("#markdown");
    box1.value ="# Header one\n\nHello there\n\nHow are you?\nWhat's going on?\n\n## Another Header\n\nThis is a paragraph [with an inline link](http://google.com). Neat, eh? \n\n## This is a header [with a link](http://yahoo.com)"
    const button = container.querySelector(".button");
    button.click();
    const box2 = container.querySelector("#html-output");
    expect(box2.value).toBe(`<h1>Header one</h1>\n<p>Hello there</p>\n<p>How are you?\nWhat's going on?</p>\n<h2>Another Header</h2>\n<p>This is a paragraph <a href="http://google.com">with an inline link</a>. Neat, eh? </p>\n<h2>This is a header <a href="http://yahoo.com">with a link</a></h2>`);
  })
})
