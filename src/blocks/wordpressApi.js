import { withSelect } from '@wordpress/data';
import { ComboboxControl } from '@wordpress/components';
import { useEffect, useState } from '@wordpress/element';
import apiFetch from '@wordpress/api-fetch';

export const RedirectSelectControl = withSelect((select) => {
  const pages = select('core').getEntityRecords('postType', 'page');
  if (pages && !pages.some(page => page.id === -1)) {
    // ホームページ用の選択肢を追加します。
    pages.unshift({ id: -1, title: { rendered: 'ホーム' }, link: '/' });
  }
  return { pages }

})(function ({ pages, setAttributes, attributes, label }) {
  const { selectedPageId, selectedPageUrl } = attributes;
  // 選択肢が選択されたときの処理です。
  const handleChange = (selectedId) => {
    const selectedPage = pages.find(page => page.id === selectedId);
    setAttributes({
      selectedPageId: selectedId,
      selectedPageUrl: selectedPage ? selectedPage.link : '/'
    });
  };
  // 選択肢を作成します。
  const options = pages ? pages.map(page => ({
    value: page.id,
    label: page.title.rendered
  })) : [];

  return (
    <ComboboxControl
      label={label}
      options={options}
      value={selectedPageId}
      onChange={handleChange}
    />
  );
});

export const ArchiveUrlArray = ({ setAttributes, attributes, label }) => {
  const { selectedPageId, selectedPageUrl } = attributes;
  const [archiveUrl, setArchiveUrl] = useState([]);

  useEffect(() => {
    const fetchArchiveArr = async () => {
      try {
        const response = await apiFetch({ path: '/wp/v2/types' });
        let idCounter = 0;  // 連番のカウンター
        const archiveArray = Object.keys(response).reduce((acc, key) => {
          const postType = response[key];
          if (postType.has_archive === true) {
            acc.push({ value: idCounter++, link: postType.slug, label: postType.name });
          } else if (typeof postType.has_archive === 'string') {
            acc.push({ value: idCounter++, link: postType.has_archive, label: postType.name });
          }
          return acc;
        }, [])
        setArchiveUrl(archiveArray);
      } catch (error) {
        console.error('Error fetching data:', error.message);
      }
    };

    fetchArchiveArr();
  }, []);

  const handleChange = (selectedId) => {
    const selectedPage = archiveUrl.find(page => page.value === selectedId);
    setAttributes({
      selectedPageId: selectedId,
      selectedPageUrl: selectedPage ? `/${selectedPage.link}` : '/'
    });
  };

  return (
    <ComboboxControl
      label={label}
      options={archiveUrl}
      value={selectedPageId}
      onChange={handleChange}
    />
  );
};