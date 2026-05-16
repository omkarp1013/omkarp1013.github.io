'use client';

import React from 'react';

interface Post {
  slug: string;
  year: string;
  title: string;
  date: string;
}

interface WritingYearClientProps {
  year: string;
  posts: Post[];
  startDate: string;
}

export default function WritingYearClient({ year, posts, startDate }: WritingYearClientProps) {
  // We serialize the posts into a dictionary map for the client script
  const postsDictStr = JSON.stringify(
    posts.reduce((acc, p) => {
      acc[p.slug] = { title: p.title, url: `/writing/${p.year}/${p.slug}` };
      return acc;
    }, {} as Record<string, any>)
  );

  const scriptContent = `
    if (typeof window !== 'undefined' && !window.customElements.get('daily-list')) {
      class DailyList extends HTMLElement {
        connectedCallback() {
          const posts = JSON.parse(this.getAttribute('data-posts') || '{}');
          const year = this.getAttribute('data-year');
          const startDateStr = this.getAttribute('data-start');

          // Get exact current date in EST
          const now = new Date();
          const parts = new Intl.DateTimeFormat('en-US', {
            timeZone: 'America/New_York',
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
          }).formatToParts(now);
          const yy = parts.find(p => p.type === 'year').value;
          const mm = parts.find(p => p.type === 'month').value;
          const dd = parts.find(p => p.type === 'day').value;
          const todayKey = yy + "-" + mm + "-" + dd;

          const yearStart = year + "-01-01";
          const rangeFrom = startDateStr > yearStart ? startDateStr : yearStart;
          const yearEnd = year + "-12-31";
          const rangeTo = todayKey < yearEnd ? todayKey : yearEnd;

          const days = [];
          if (rangeFrom <= rangeTo) {
            const cur = new Date(rangeFrom + "T00:00:00");
            const end = new Date(rangeTo + "T00:00:00");
            while (cur <= end) {
              const y = cur.getFullYear();
              const m = String(cur.getMonth() + 1).padStart(2, "0");
              const d = String(cur.getDate()).padStart(2, "0");
              days.push(y + "-" + m + "-" + d);
              cur.setDate(cur.getDate() + 1);
            }
          }
          days.reverse();

          function fmt(key) {
            const p = key.split("-");
            return "[" + p[1] + "/" + p[2] + "/" + p[0] + "]";
          }

          let html = '<div style="display: flex; flex-direction: column; gap: 0.75rem;">';
          let i = 0;
          while (i < days.length) {
            const key = days[i];
            if (posts[key] && key <= todayKey) {
              html += '<div style="font-size: var(--chakra-fontSizes-md); display: flex; gap: 0.5rem;">' +
                      '<span style="color: var(--chakra-colors-gray-900);" class="dark-date">' + fmt(key) + '</span>' +
                      ' <a href="' + posts[key].url + '" class="post-link" style="text-decoration: underline;">' + posts[key].title + '</a>' +
                      '</div>';
              i++;
            } else {
              let j = i;
              while (j < days.length && !(posts[days[j]] && days[j] <= todayKey)) {
                j++;
              }
              const runStart = days[i];
              const runEnd = days[j - 1];
              let text = "";
              if (runStart === runEnd) {
                text = fmt(runStart) + " I did not write anything today.";
              } else {
                const startP = runStart.split("-");
                const endP = runEnd.split("-");
                text = "[" + endP[1] + "/" + endP[2] + "/" + endP[0] + " – " + startP[1] + "/" + startP[2] + "/" + startP[0] + "] I did not write anything on these days";
              }
              html += '<p style="color: var(--chakra-colors-gray-400); font-size: var(--chakra-fontSizes-md); margin: 0;">' + text + '</p>';
              i = j;
            }
          }
          html += '</div>';
          this.innerHTML = html;
        }
      }
      window.customElements.define('daily-list', DailyList);
    }
  `;

  return (
    <>
      <style dangerouslySetInnerHTML={{
        __html: `
          @media (prefers-color-scheme: dark) {
            [data-theme="dark"] daily-list .dark-date {
              color: var(--chakra-colors-gray-300) !important;
            }
          }
        `
      }} />
      <script dangerouslySetInnerHTML={{ __html: scriptContent }} suppressHydrationWarning />
      {/* @ts-expect-error - Custom Web Component */}
      <daily-list 
        data-year={year} 
        data-posts={postsDictStr} 
        data-start={startDate} 
        suppressHydrationWarning 
      />
    </>
  );
}