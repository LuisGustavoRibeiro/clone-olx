import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { PageArea, SearchArea } from './styled';
import UseAPI from '../../helpers/OlxAPI'

import { PageContainer } from '../../components/MainComponents';
import AdItem from '../../components/partials/AdItem';

const Page = () => {
    const api = UseAPI();

    const [stateList, setSateLlist] = useState([]);
    const [categories, setCategories] = useState([]);
    const [adList, setAdList] = useState([]);

    useEffect(() => {
        const getStates = async () => {
            const slist = await api.getStates();
            setSateLlist(slist);
        }
        getStates();
    }, []);

    useEffect(() => {
        const getCategories = async () => {
            const cats = await api.getCategories();
            setCategories(cats);
        }
        getCategories();
    }, []);

    useEffect(() => {
        const getRecentAds = async () => {
            const json = await api.getAds({
                sort:'desc',
                limit:8
            });
            console.log(json.ads);
            setAdList(json.ads);
        }        
        getRecentAds();
    }, []);

    return (
        <>
            <SearchArea>
                <PageContainer>
                    <div className="searchBox">
                        <form method="GET" action="/">
                            <input type="text" name="q" placeholder="O que você procura?"/>
                            <select name="state">
                                {stateList.map((i,key)=>
                                    <option key={key} value={i.name}>{i.name}</option>
                                )}
                            </select>
                            <button>Pesquisar</button>
                        </form>
                    </div>
                    <div className="categoryList">
                        {categories.map((i, key)=>
                            <Link key={key} to={`/ads?cat=${i.slug}`} className="categoryItem">
                                <img src={i.img} alt="" />
                                <span>{i.name}</span>
                            </Link>
                        )}
                    </div>
                </PageContainer>
            </SearchArea>
            <PageContainer>           
                <PageArea>
                    <h2>Anúncios Recentes</h2>
                    <div className="list">
                        {adList.map((i,key)=>
                            <AdItem key={key} data={i}/>
                        )}
                    </div>
                    <Link to="/ads" className="seeAllLink">Ver todos</Link>

                    <hr/>

                    aspkdpkasdapdkpakdpokapodkpoadkpoakpodkpasodkpoakdpoakdpksadpoakdpokdpoakadkpoadkpoakdpoakdpakdkadkpakdpoakdpkasdpkadkapdokapsodkpoaskd
                    aspkdpkasdapdkpakdpokapodkpoadkpoakpodkpasodkpoakdpoakdpksadpoakdpokdpoakadkpoadkpoakdpoakdpakdkadkpakdpoakdpkasdpkadkapdokapsodkpoaskd
                </PageArea>
            </PageContainer>
        </>
        
    );
}

export default Page;