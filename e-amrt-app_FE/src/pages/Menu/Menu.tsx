import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Route } from 'react-router-dom'
import CheckBox from '../../components/CheckBox/CheckBox'
import MenuCard from '../../components/MenuCard/MenuCard'
import ScrollButton from '../../components/ScrollButton/ScrollButton'
import { AppStateType } from '../../redux/reducers/root-reducer'
import { fetchPerfumes, fetchPerfumesByFilterParams } from '../../redux/thunks/perfume-thunks'
import { FilterParamType, Perfume } from '../../types/types'
import "./Menu.css"
import {gender, perfumer, price} from './MenuData'

function Menu() {
    const dispatch = useDispatch();
    const perfumes: Array<Perfume> = useSelector((state: AppStateType) => state.perfume.perfumes);
    const loading: boolean = useSelector((state: AppStateType) => state.perfume.isPerfumeLoading);
    const [filterParams, setFilterParams] = useState<FilterParamType>({
        perfumers: [],
        genders: [],
        prices: []
    })

    useEffect(() => {
        dispatch(fetchPerfumes());
    }, [])
    
    const [sortByPrice, setSortByPrice] = useState<boolean>();

    const getProducts = (variables: FilterParamType): void => {
        dispatch(fetchPerfumesByFilterParams(variables));
    }

    const handlePrice = (value: number): Array<number> => {
        console.log("value ", value);
        let find = price.find((item) => item.id == value);
        console.log("find ", find);
        return find!.array;
    }

    const handleSortByPrice = (sortByPrice: boolean, event: React.MouseEvent<HTMLAnchorElement, MouseEvent>): void => {
        event.preventDefault();

        setSortByPrice(sortByPrice);
        getProducts({...filterParams, sortByPrice: sortByPrice})
    }

    const handleFilters = (filters: Array<string> | number, category: string): void => {
        const newFilters: any = filterParams;
        newFilters[category] = filters;

        if (category === "prices") {
            let priceValues = handlePrice(filters as number);
            newFilters[category] = priceValues;
        }
        getProducts({...newFilters, sortByPrice})
        setFilterParams(newFilters);
    };

    return (
        <div className='container d-flex'>
            <ScrollButton />
            <div id="sidebar">
                <div className="sidebar-header">
                    <h3>Perfumes</h3>
                </div>
                <ul className="list-unstyled components">
                    <h5>Brand</h5>
                    <li className='active mb-2' id='homeSubmenu'>
                        <CheckBox 
                            list={perfumer} 
                            handleFilters={(filters) => handleFilters(filters, 'perfumers')}
                            />
                    </li>
                    <h5>Gender</h5>
                    <li className='active mb-2' id='homeSubmenu'>
                        <CheckBox 
                            list={gender} 
                            handleFilters={(filters) => handleFilters(filters, 'genders')}
                            />
                    </li>
                    <h5>Prices</h5>
                    <li className='active mb-2' id='homeSubmenu'>
                        <CheckBox 
                            list={price} 
                            handleFilters={(filters) => handleFilters(filters, 'prices')}
                            />
                    </li>
                </ul>
            </div>

            <Route exact component={() => 
                <MenuCard
                    data={perfumes}
                    loading={loading}
                    itemsPerPage={16}
                    searchByData={[
                        {label: 'Brand', value: 'perfumer'},
                        {label: 'Perfume title', value: 'perfumeTitle'},
                        {label: 'Manufacturer country', value: 'country'}
                    ]}
                    sortByPrice={sortByPrice}
                    handleSortByPrice={handleSortByPrice}
                />
        }   

            />
        </div>
    )
}

export default Menu