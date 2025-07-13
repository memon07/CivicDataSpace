
import Head from 'next/head';
import { useState } from 'react';
import styles from '../styles/DataPortal.module.css';

interface Dataset {
  id: string;
  title: string;
  description: string;
  lastUpdated: string;
  downloads: string;
  geography: string;
  sectors: string[];
  tags: string[];
  formats: string[];
  publishedBy: string;
}

const mockDatasets: Dataset[] = [
  {
    id: '1',
    title: 'Green Tagged Public Procurement Data related to Climate Action in Assam, India',
    description: 'Natural and man-made environmental resources - fresh water, clean air, forests, grasslands, marine resources, and agro-ecosystems - provide sustenance and a foundation for social and economic development. The need to safeguard these resources crosses all borders.',
    lastUpdated: '19 July 2024',
    downloads: '500+',
    geography: 'Assam, India',
    sectors: ['Biodiversity'],
    tags: ['Biodiversity', 'Forests', 'Climate', 'Pollution'],
    formats: ['CSV', 'JSON', 'XLS', 'API'],
    publishedBy: 'Government Agency'
  },
  {
    id: '2',
    title: 'Flood Risk Points (locations) dataset',
    description: 'Locations of Flood Risk Points (identifier, longitude, latitude)',
    lastUpdated: '19 July 2024',
    downloads: '500+',
    geography: 'Bangkok',
    sectors: ['Disaster Risk Reduction'],
    tags: ['Floods', 'Risk', 'Locations'],
    formats: ['CSV', 'JSON'],
    publishedBy: 'Bangkok Authority'
  },
  {
    id: '3',
    title: 'Satellite Detected Water Extent in Maguindanao and Cotabato Provinces, Philippines',
    description: 'This map illustrates the satellite-detected water extent in Maguindanao and Cotabato provinces, Philippines.',
    lastUpdated: '03 Dec 2021',
    downloads: '500+',
    geography: 'Philippines',
    sectors: ['Climate and Health'],
    tags: ['Satellite', 'Water', 'Mapping'],
    formats: ['GeoJSON', 'KML'],
    publishedBy: 'Philippines Agency'
  },
  {
    id: '4',
    title: 'Flood Mitigation Projects dataset',
    description: 'Details of Flood Mitigation Projects related to each Flood Risk Point (flood risk point identifier, project identifier, status, road, area, activity)',
    lastUpdated: '31 July 2024',
    downloads: '500+',
    geography: 'Bangkok',
    sectors: ['Disaster Risk Reduction'],
    tags: ['Floods', 'Mitigation', 'Projects'],
    formats: ['CSV', 'XLS'],
    publishedBy: 'Bangkok Authority'
  },
  {
    id: '5',
    title: 'Health Management Information System (HMIS) Data',
    description: 'Data here covers climate systems, exposure to climate impacts, resilience, greenhouse gas emissions, and energy use.',
    lastUpdated: '19 July 2024',
    downloads: '500+',
    geography: 'India',
    sectors: ['Climate and Health'],
    tags: ['Health', 'Climate', 'Management'],
    formats: ['CSV', 'JSON', 'API'],
    publishedBy: 'India Health Ministry'
  },
  {
    id: '6',
    title: 'Performance of Key HMIS Indicators for Maternal Health of Assam for April to December during 2016-17',
    description: 'Updated On Weekly Basis; Status As On: 03 Aug 2016, 1:57 PM; Financial Year: 2016-17; Provisional Figures for the Period April to December.',
    lastUpdated: '19 July 2024',
    downloads: '500+',
    geography: 'India',
    sectors: ['Climate and Health'],
    tags: ['Health', 'Maternal', 'Indicators'],
    formats: ['CSV', 'XLS'],
    publishedBy: 'India Health Ministry'
  }
];

const Home = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [selectedSectors, setSelectedSectors] = useState<string[]>([]);
  const [selectedPeriods, setSelectedPeriods] = useState<string[]>([]);
  const [selectedDataTypes, setSelectedDataTypes] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('Latest Updated');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const filteredDatasets = mockDatasets.filter(dataset => {
    // Search filter
    if (searchTerm.trim() && 
        !dataset.title.toLowerCase().includes(searchTerm.toLowerCase()) && 
        !dataset.description.toLowerCase().includes(searchTerm.toLowerCase()) &&
        !dataset.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase())) &&
        !dataset.geography.toLowerCase().includes(searchTerm.toLowerCase())) {
      return false;
    }
    
    // Sector filter
    if (selectedSectors.length > 0 && !dataset.sectors.some(sector => selectedSectors.includes(sector))) {
      return false;
    }
    
    // Data type filter
    if (selectedDataTypes.length > 0 && !dataset.formats.some(format => selectedDataTypes.includes(format))) {
      return false;
    }
    
    return true;
  });

  // Sort datasets
  const sortedDatasets = [...filteredDatasets].sort((a, b) => {
    switch (sortBy) {
      case 'Most Downloaded':
        return parseInt(b.downloads) - parseInt(a.downloads);
      case 'Alphabetical':
        return a.title.localeCompare(b.title);
      case 'Latest Updated':
      default:
        return new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime();
    }
  });

  const totalPages = Math.ceil(sortedDatasets.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const currentDatasets = sortedDatasets.slice(startIndex, startIndex + rowsPerPage);

  const handleSectorChange = (sector: string) => {
    setSelectedSectors(prev => 
      prev.includes(sector) 
        ? prev.filter(s => s !== sector)
        : [...prev, sector]
    );
    setCurrentPage(1); // Reset to first page when filtering
  };

  const handleDataTypeChange = (dataType: string) => {
    setSelectedDataTypes(prev => 
      prev.includes(dataType) 
        ? prev.filter(d => d !== dataType)
        : [...prev, dataType]
    );
    setCurrentPage(1);
  };

  const handleResetFilters = () => {
    setSelectedSectors([]);
    setSelectedPeriods([]);
    setSelectedDataTypes([]);
    setSearchTerm('');
    setCurrentPage(1);
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>CivicDataSpace - All Data</title>
        <meta name="description" content="Open data portal for civic datasets" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Header */}
      <header className={styles.header}>
        <div className={styles.headerContent}>
          <div className={styles.logo}>
            <span className={styles.logoIcon}>🔗</span>
            <span className={styles.logoText}>CivicDataSpace</span>
          </div>
          <nav className={styles.nav}>
            <a href="#" className={styles.navLink}>ALL DATA</a>
            <a href="#" className={styles.navLink}>SECTORS</a>
            <a href="#" className={styles.navLink}>USE CASES</a>
            <a href="#" className={styles.navLink}>PUBLISHERS</a>
            <a href="#" className={styles.navLink}>ABOUT US</a>
          </nav>
          <button className={styles.loginBtn}>LOGIN / SIGN UP</button>
        </div>
      </header>

      {/* Breadcrumb */}
      <div className={styles.breadcrumb}>
        <div className={styles.container}>
          <span>Home</span> &gt; <span className={styles.currentPage}>All Data</span>
        </div>
      </div>

      {/* Main Content */}
      <div className={styles.mainContent}>
        {/* Sidebar */}
        <aside className={styles.sidebar}>
          <div className={styles.filtersHeader}>
            <h3>FILTERS</h3>
            <button className={styles.resetBtn} onClick={handleResetFilters}>RESET</button>
          </div>

          {/* Sectors Filter */}
          <div className={styles.filterSection}>
            <h4>Sectors ({[...new Set(mockDatasets.flatMap(d => d.sectors))].length})</h4>
            <div className={styles.filterOptions}>
              {[...new Set(mockDatasets.flatMap(d => d.sectors))].map(sector => (
                <label key={sector}>
                  <input 
                    type="checkbox" 
                    checked={selectedSectors.includes(sector)}
                    onChange={() => handleSectorChange(sector)}
                  />
                  {sector}
                </label>
              ))}
            </div>
          </div>

          {/* Time Period Filter */}
          <div className={styles.filterSection}>
            <h4>Time Period (7)</h4>
            <div className={styles.filterOptions}>
              <label><input type="checkbox" /> 2000-2003</label>
              <label><input type="checkbox" /> 2003-2006</label>
              <label><input type="checkbox" /> 2006-2009</label>
              <label><input type="checkbox" /> 2009-2012</label>
              <label><input type="checkbox" /> 2012-2015</label>
            </div>
          </div>

          {/* Data Type Filter */}
          <div className={styles.filterSection}>
            <h4>Data Type ({[...new Set(mockDatasets.flatMap(d => d.formats))].length})</h4>
            <div className={styles.filterOptions}>
              {[...new Set(mockDatasets.flatMap(d => d.formats))].map(format => (
                <label key={format}>
                  <input 
                    type="checkbox" 
                    checked={selectedDataTypes.includes(format)}
                    onChange={() => handleDataTypeChange(format)}
                  />
                  {format}
                </label>
              ))}
            </div>
          </div>

          {/* Tags Filter */}
          <div className={styles.filterSection}>
            <h4>Tags (30)</h4>
          </div>

          {/* Licenses Filter */}
          <div className={styles.filterSection}>
            <h4>Licenses (5)</h4>
          </div>

          {/* Geographies Filter */}
          <div className={styles.filterSection}>
            <h4>Geographies (15)</h4>
          </div>
        </aside>

        {/* Content Area */}
        <main className={styles.content}>
          {/* Search Bar */}
          <div className={styles.searchSection}>
            <div className={styles.searchBar}>
              <input 
                type="text" 
                placeholder="Start typing to search for any Dataset"
                className={styles.searchInput}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className={styles.viewControls}>
              <button 
                className={`${styles.gridView} ${viewMode === 'grid' ? styles.active : ''}`}
                onClick={() => setViewMode('grid')}
              >
                ⊞
              </button>
              <button 
                className={`${styles.listView} ${viewMode === 'list' ? styles.active : ''}`}
                onClick={() => setViewMode('list')}
              >
                ☰
              </button>
              <select 
                className={styles.sortSelect}
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="Latest Updated">Latest Updated</option>
                <option value="Most Downloaded">Most Downloaded</option>
                <option value="Alphabetical">Alphabetical</option>
              </select>
            </div>
          </div>

          {/* Dataset Cards */}
          <div className={`${styles.datasetGrid} ${viewMode === 'grid' ? styles.gridMode : styles.listMode}`}>
            {currentDatasets.map((dataset) => (
              <div key={dataset.id} className={styles.datasetCard}>
                <div className={styles.cardHeader}>
                  <h3 className={styles.datasetTitle}>{dataset.title}</h3>
                  <div className={styles.cardActions}>
                    <button className={styles.bookmarkBtn}>⭐</button>
                    <button className={styles.shareBtn}>🔗</button>
                  </div>
                </div>
                
                <div className={styles.cardContent}>
                  <p className={styles.description}>{dataset.description}</p>
                  
                  <div className={styles.cardMeta}>
                    <div className={styles.metaGrid}>
                      <div className={styles.metaItem}>
                        <span className={styles.metaLabel}>Last Updated</span>
                        <span className={styles.metaValue}>{dataset.lastUpdated}</span>
                      </div>
                      <div className={styles.metaItem}>
                        <span className={styles.metaLabel}>Downloads</span>
                        <span className={styles.metaValue}>{dataset.downloads}</span>
                      </div>
                      <div className={styles.metaItem}>
                        <span className={styles.metaLabel}>Geography</span>
                        <span className={styles.metaValue}>{dataset.geography}</span>
                      </div>
                      <div className={styles.metaItem}>
                        <span className={styles.metaLabel}>Charts</span>
                        <span className={styles.metaValue}>Available</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className={styles.cardTags}>
                    <div className={styles.tagRow}>
                      <span className={styles.tagLabel}>Sectors:</span>
                      <div className={styles.sectorIndicators}>
                        {dataset.sectors.map((sector, index) => (
                          <span 
                            key={sector} 
                            className={styles.sectorDot} 
                            style={{backgroundColor: `hsl(${index * 120}, 60%, 50%)`}}
                            title={sector}
                          ></span>
                        ))}
                      </div>
                    </div>
                    
                    <div className={styles.tagRow}>
                      <span className={styles.tagLabel}>Tags:</span>
                      <div className={styles.tagsList}>
                        {dataset.tags.slice(0, 3).map(tag => (
                          <span key={tag} className={styles.tagBadge}>{tag}</span>
                        ))}
                        {dataset.tags.length > 3 && (
                          <span className={styles.tagMore}>+{dataset.tags.length - 3}</span>
                        )}
                      </div>
                    </div>
                    
                    <div className={styles.tagRow}>
                      <span className={styles.tagLabel}>Formats:</span>
                      <div className={styles.formatsList}>
                        {dataset.formats.map(format => (
                          <span key={format} className={styles.formatBadge}>{format}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  <div className={styles.cardFooter}>
                    <div className={styles.publisher}>
                      <span className={styles.publisherIcon}>👤</span>
                      <span className={styles.publisherName}>{dataset.publishedBy}</span>
                    </div>
                    <button className={styles.viewDataBtn}>View Data</button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className={styles.pagination}>
            <div className={styles.paginationInfo}>
              <span>Rows per page:</span>
              <select 
                value={rowsPerPage} 
                onChange={(e) => {
                  setRowsPerPage(Number(e.target.value));
                  setCurrentPage(1);
                }}
                className={styles.rowsSelect}
              >
                <option value={5}>05</option>
                <option value={10}>10</option>
                <option value={25}>25</option>
              </select>
              <span>Page {currentPage} of {totalPages} ({sortedDatasets.length} total results)</span>
            </div>
            <div className={styles.paginationControls}>
              <button 
                onClick={() => setCurrentPage(1)}
                disabled={currentPage === 1}
                className={styles.pageBtn}
              >
                ⟪
              </button>
              <button 
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className={styles.pageBtn}
              >
                ⟨
              </button>
              <button 
                onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
                className={styles.pageBtn}
              >
                ⟩
              </button>
              <button 
                onClick={() => setCurrentPage(totalPages)}
                disabled={currentPage === totalPages}
                className={styles.pageBtn}
              >
                ⟫
              </button>
            </div>
          </div>
        </main>
      </div>

      {/* Footer */}
      <footer className={styles.footer}>
        <div className={styles.footerContent}>
          <div className={styles.footerLogo}>
            <span className={styles.logoIcon}>🔗</span>
            <span className={styles.logoText}>CivicDataSpace</span>
          </div>
          <div className={styles.footerLinks}>
            <a href="#">ABOUT US</a>
            <a href="#">SITEMAP</a>
            <a href="#">CONTACT US</a>
          </div>
          <div className={styles.socialLinks}>
            <span>Follow Us</span>
            <div className={styles.socialIcons}>
              <span>📧</span>
              <span>📘</span>
              <span>🐦</span>
              <span>📘</span>
            </div>
          </div>
          <div className={styles.footerCredit}>
            <span>made by 🔗</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
