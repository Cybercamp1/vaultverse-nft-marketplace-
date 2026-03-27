import { useState } from 'react';
import { motion } from 'framer-motion';
import { ethers } from 'ethers';
import { Wallet, Gem, Shield, Zap, Upload, X } from 'lucide-react';
import './index.css';

function App() {
  const [activeTab, setActiveTab] = useState('explore');
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [selectedNft, setSelectedNft] = useState<any | null>(null);

  const [mintName, setMintName] = useState('');
  const [mintDescription, setMintDescription] = useState('');
  const [mintPrice, setMintPrice] = useState('');
  const [isMinting, setIsMinting] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [myNfts, setMyNfts] = useState<{name: string; description: string; price: string; image: string; buyers: number}[]>([]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleMint = async () => {
    if (!walletAddress) {
      alert("Please connect your wallet first!");
      return;
    }
    if (!mintName || !mintPrice || !previewUrl) {
      alert("Please provide an image, name, and price.");
      return;
    }

    try {
      setIsMinting(true);
      if (typeof window.ethereum !== 'undefined') {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        
        // Web3 interaction: request signature to authorize listing
        await signer.signMessage(`Approve Creation of Vaultverse NFT:\nName: ${mintName}\nPrice: ${mintPrice} ETH\n(Vaultverse Secure Authorization)`);
        setMyNfts((prev) => [...prev, { name: mintName, description: mintDescription, price: mintPrice, image: previewUrl as string, buyers: 0 }]);
        alert("Success! Your NFT has been minted and listed on the Vaultverse Market.");
        setMintName('');
        setMintDescription('');
        setMintPrice('');
        setPreviewUrl(null);
        setActiveTab('dashboard');
      }
    } catch (err) {
      console.error(err);
      alert("Minting cancelled or failed.");
    } finally {
      setIsMinting(false);
    }
  };

  const connectWallet = async () => {
    // Basic mock connection
    if (typeof window.ethereum !== 'undefined') {
      try {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        setWalletAddress(accounts[0]);
      } catch (err) {
        console.error('Failed to connect', err);
      }
    } else {
      alert('Please install MetaMask');
    }
  };

  const nfts = [
    { id: 1, title: 'Cosmic Entity #42', price: '2.5 ETH', image: '/nft_entity_1_1774593863962.png', description: 'A futuristic cosmic entity floating in the dark universe.', buyers: 42 },
    { id: 2, title: 'Nebula Fragments #09', price: '1.2 ETH', image: '/nft_nebula_2_1774593892848.png', description: 'Glowing nebula fragments captured in an eternal voxel loop.', buyers: 15 },
    { id: 3, title: 'Digital Odyssey #77', price: '4.8 ETH', image: '/nft_odyssey_3_1774593936289.png', description: 'Majestic digital odyssey character inside a neon dreamscape.', buyers: 89 },
    { id: 4, title: 'Ethereum Matrix #12', price: '0.8 ETH', image: '/nft_entity_1_1774593863962.png', description: 'The core block matrix visualization holding endless data.', buyers: 5 },
  ];

  return (
    <div className="container">
      <nav className="nav glass" style={{ padding: '24px 32px', marginTop: '24px', borderRadius: '100px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ background: 'var(--primary)', padding: '12px', borderRadius: '50%' }}>
            <Gem size={24} color="white" />
          </div>
          <span style={{ fontSize: '1.5rem', fontWeight: 800 }}>Vaultverse</span>
        </div>
        
        <div className="nav-links">
          <button className={`nav-link ${activeTab === 'explore' ? 'active' : ''}`} onClick={() => setActiveTab('explore')}>Explore</button>
          <button className={`nav-link ${activeTab === 'create' ? 'active' : ''}`} onClick={() => setActiveTab('create')}>Create</button>
          <button className={`nav-link ${activeTab === 'dashboard' ? 'active' : ''}`} onClick={() => setActiveTab('dashboard')}>Dashboard</button>
        </div>

        <button className="button-primary" onClick={connectWallet}>
          <Wallet size={18} style={{ marginRight: '8px' }} />
          {walletAddress ? `${walletAddress.substring(0,6)}...${walletAddress.substring(38)}` : 'Connect Wallet'}
        </button>
      </nav>

      {activeTab === 'explore' && (
        <>
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="hero"
          >
            <h1 className="hero-title">Discover, Collect, and Sell <span className="text-gradient">Extraordinary NFTs</span></h1>
            <p className="hero-subtitle">Voltverse is the premier decentralized marketplace for Web3 creators and collectors. Powered by secure smart contracts on the Ethereum blockchain.</p>
            <div className="hero-buttons">
              <button className="button-primary" style={{ padding: '16px 32px', fontSize: '1.1rem' }}>
                <Gem size={20} style={{ marginRight: '8px' }} /> Explore Collection
              </button>
              <button className="button-secondary" onClick={() => setActiveTab('create')} style={{ padding: '16px 32px', fontSize: '1.1rem' }}>
                Create NFT
              </button>
            </div>
            
            <div style={{ display: 'flex', gap: '32px', marginTop: '48px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-muted)' }}><Shield size={20} /> Secure Smart Contracts</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-muted)' }}><Zap size={20} /> Zero Trading Fees</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-muted)' }}><Gem size={20} /> Exclusive Collections</div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '32px' }}>
              <h2>Trending NFTs</h2>
              <button className="button-secondary">View All</button>
            </div>
            <div className="nft-grid">
              {nfts.map((nft, index) => (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + (index * 0.1) }}
                  key={nft.id} 
                  className="nft-card glass"
                >
                  <div className="nft-image-container">
                    <img src={nft.image} alt={nft.title} className="nft-image" loading="lazy" />
                  </div>
                  <div className="nft-info">
                    <h3 className="nft-title">{nft.title}</h3>
                    <div className="nft-price-row">
                      <div className="nft-price-label">Current Price</div>
                      <div className="nft-price-value">{nft.price}</div>
                    </div>
                  </div>
                  <button className="button-primary" style={{ marginTop: '8px', width: '100%' }}>Buy Now</button>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </>
      )}

      {activeTab === 'create' && (
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="create-form glass"
        >
          <h2 style={{ fontSize: '2rem', textAlign: 'center', marginBottom: '16px' }}>Create New Item</h2>
          
          <div className="form-group">
            <label className="form-label">Upload Artwork</label>
            <div className="upload-container" onClick={() => document.getElementById('nft-upload')?.click()}>
              {previewUrl ? (
                <img src={previewUrl} alt="Preview" style={{ width: '100%', maxHeight: '300px', objectFit: 'contain', borderRadius: '8px' }} />
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px', color: 'var(--text-muted)' }}>
                  <Upload size={48} />
                  <span style={{ fontWeight: 500 }}>Click to browse or drag and drop</span>
                  <span style={{ fontSize: '0.8rem' }}>PNG, GIF, WEBP, MP4 or 3D. Max 100mb.</span>
                </div>
              )}
              <input 
                id="nft-upload" 
                type="file" 
                style={{ display: 'none' }} 
                accept="image/*,video/*,audio/*"
                onChange={handleImageChange}
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Name</label>
            <input type="text" className="form-input" placeholder="Item name" value={mintName} onChange={(e) => setMintName(e.target.value)} />
          </div>

          <div className="form-group">
            <label className="form-label">Description</label>
            <textarea className="form-input" style={{ minHeight: '120px', resize: 'vertical' }} placeholder="Provide a detailed description of your item" value={mintDescription} onChange={(e) => setMintDescription(e.target.value)} />
          </div>

          <div className="form-group">
            <label className="form-label">Price in ETH</label>
            <input type="number" className="form-input" placeholder="e.g. 0.05" step="0.01" value={mintPrice} onChange={(e) => setMintPrice(e.target.value)} />
          </div>

          <div className="form-group" style={{ marginTop: '24px' }}>
            <button className="button-primary" style={{ padding: '16px', fontSize: '1.1rem' }} onClick={handleMint} disabled={isMinting}>
              {isMinting ? 'Processing Transaction...' : 'Mint NFT & List on Marketplace'}
            </button>
          </div>
        </motion.div>
      )}

      {activeTab === 'dashboard' && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          style={{ marginTop: '32px' }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
            <h2>My Created NFTs</h2>
          </div>
          {myNfts.length > 0 ? (
            <div className="nft-grid">
              {myNfts.map((nft, index) => (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index }}
                  key={index} 
                  className="nft-card glass"
                >
                  <div className="nft-image-container">
                    <img src={nft.image} alt={nft.name} className="nft-image" loading="lazy" />
                  </div>
                  <div className="nft-info">
                    <h3 className="nft-title">{nft.name}</h3>
                    <div className="nft-price-row">
                      <div className="nft-price-label">Listed Price</div>
                      <div className="nft-price-value">{nft.price} ETH</div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div style={{ marginTop: '64px', textAlign: 'center' }}>
              <p style={{ color: 'var(--text-muted)', fontSize: '1.2rem' }}>You haven't minted any NFTs yet.</p>
              <button className="button-primary" style={{ marginTop: '24px' }} onClick={() => setActiveTab('create')}>Create Your First NFT</button>
            </div>
          )}
        </motion.div>
      )}
    </div>
  );
}

export default App;
