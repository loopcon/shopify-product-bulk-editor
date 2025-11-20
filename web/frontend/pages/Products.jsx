import { useState, useCallback, useMemo, useEffect } from 'react';
import {
    Card, Text, LegacyStack, Icon, Badge, Divider, Autocomplete, ChoiceList, TextField, LegacyCard, Filters, DataTable,
    Button, Popover, ActionList, Page, Box, Select, DatePicker
} from '@shopify/polaris';
import { LightbulbIcon, SearchIcon, FilterIcon } from '@shopify/polaris-icons';

export default function BulkEditCard() {
    const [availability, setAvailability] = useState([]);
    const [productType, setProductType] = useState([]);
    const [taggedWith, setTaggedWith] = useState('');
    const [queryValue, setQueryValue] = useState(''); const [{ month, year }, setDate] = useState({ month: 1, year: 2025 });
    const [selectedDates, setSelectedDates] = useState({
        start: new Date(),
        end: new Date(),
    });

    const [daysAgo, setDaysAgo] = useState('');

    const handleDateChange = useCallback((value) => {
        setSelectedDates(value);
    }, []);

    const [value, setValue] = useState();
    const handleChange = useCallback(
        (newValue) => setValue(newValue),
        [],
    );

    const [selected, setSelected] = useState('is');
    const handleSelectChange = useCallback(
        (value) => setSelected(value),
        [],
    );
    const options = [
        { label: 'is', value: 'is' },
        { label: 'is blank', value: 'isblank' },
        { label: 'is not', value: 'isnot' },
        { label: 'is not blank', value: 'isnotblank' },

    ];

    const [value1, setValue1] = useState();
    const handleChange1 = useCallback(
        (newValue) => setValue1(newValue),
        [],
    );

    const [selected1, setSelected1] = useState('is');
    const handleSelectChange1 = useCallback(
        (value) => setSelected1(value),
        [],
    );
    const options1 = [
        { label: 'is', value: 'is' },
        { label: 'is not', value: 'isnot' },

    ];

    const [selected2, setSelected2] = useState('is after');
    const handleSelectChange2 = useCallback(
        (value) => setSelected2(value),
        [],
    );
    const options2 = [
        { label: 'is after', value: 'isafter' },
        { label: 'is after x days ago', value: 'isafterxdaysago' },
        { label: 'is before', value: 'isbefore' },
        { label: 'is before x days ago', value: 'isbeforexdaysago' },
    ];

    const [selected3, setSelected3] = useState('is after');
    const handleSelectChange3 = useCallback(
        (value) => setSelected3(value),
        [],
    );
    const options3 = [
        { label: 'is after', value: 'isafter' },
        { label: 'is after x days ago', value: 'isafterxdaysago' },
        { label: 'is before', value: 'isbefore' },
        { label: 'is before x days ago', value: 'isbeforexdaysago' },
    ];

    const [selected4, setSelected4] = useState('is after');
    const handleSelectChange4 = useCallback(
        (value) => setSelected4(value),
        [],
    );
    const options4 = [
        { label: 'is after', value: 'isafter' },
        { label: 'is after x days ago', value: 'isafterxdaysago' },
        { label: 'is before', value: 'isbefore' },
        { label: 'is before x days ago', value: 'isbeforexdaysago' },
    ];

    const [value5, setValue5] = useState();
    const handleChange5 = useCallback(
        (newValue) => setValue5(newValue),
        [],
    );

    const [selected5, setSelected5] = useState('contains');
    const handleSelectChange5 = useCallback(
        (value) => setSelected5(value),
        [],
    );
    const options5 = [
        { label: 'contains', value: 'contains' },
        { label: 'contains (case-insensitive)', value: 'containscaseinsensitive' },
        { label: 'is blank', value: 'isblank' },
        { label: 'is not', value: 'isnot' },
        { label: 'is not blank', value: 'isnotblank' },

    ];

    const handleProductTypeChange = useCallback(
        (value) => setProductType(value),
        [],
    );
    const handleTaggedWithChange = useCallback(
        (value) => setTaggedWith(value),
        [],
    );
    const handleFiltersQueryChange = useCallback(
        (value) => setQueryValue(value),
        [],
    );
    const handleAvailabilityRemove = useCallback(() => setAvailability([]), []);
    const handleProductTypeRemove = useCallback(() => setProductType([]), []);
    const handleTaggedWithRemove = useCallback(() => setTaggedWith(''), []);
    const handleQueryValueRemove = useCallback(() => setQueryValue(''), []);
    const handleFiltersClearAll = useCallback(() => {
        handleAvailabilityRemove();
        handleProductTypeRemove();
        handleTaggedWithRemove();
        handleQueryValueRemove();
    }, [
        handleAvailabilityRemove,
        handleQueryValueRemove,
        handleProductTypeRemove,
        handleTaggedWithRemove,
    ]);

    const filters = [
        {
            key: 'productFields',
            label: (
                <Text variant="headingSm" as="span" fontWeight="bold">Product Fields</Text>
            ),
            filter: null,
        },
        {
            key: 'Category',
            label: 'Category',
            filter: (
                <>
                    <Select
                        options={options}
                        onChange={handleSelectChange}
                        value={selected}
                    />
                    <TextField
                        value={value}
                        placeholder='Start typing a category'
                        onChange={handleChange}
                        autoComplete="off"
                    />
                </>
            ),
            shortcut: true,
        },
        {
            key: 'Collection',
            label: 'Collection',
            filter: (
                <>
                    <Select
                        options={options1}
                        onChange={handleSelectChange1}
                        value={selected1}
                    />
                    <TextField
                        value={value1}
                        placeholder='Start typing a collection name'
                        onChange={handleChange1}
                        autoComplete="off"
                    />
                </>
            ),
            shortcut: true,
        },
        {
            key: 'DateCreated',
            label: 'Date Created',
            filter: (
                <>
                    <Select
                        options={options2}
                        onChange={handleSelectChange2}
                        value={selected2}
                    />

                    {(selected2 === "isafter" || selected2 === "isbefore") && (
                        <div style={{ marginTop: "12px" }}>
                            <DatePicker
                                month={month}
                                year={year}
                                selected={selectedDates}
                                onChange={handleDateChange}
                                onMonthChange={(month, year) => setDate({ month, year })}
                            />
                        </div>
                    )}

                    {/* If Select = isafterxdaysago or isbeforexdaysago → show text input */}
                    {(selected2 === "isafterxdaysago" || selected2 === "isbeforexdaysago") && (
                        <div style={{ marginTop: "12px" }}>
                            <TextField
                                labelHidden
                                label="Days ago"
                                type="number"
                                placeholder="Enter number of days"
                                value={daysAgo}
                                onChange={setDaysAgo}
                            />
                        </div>
                    )}
                </>
            ),
            shortcut: true,
        },

        {
            key: 'DatePublished',
            label: 'Date Published',
            filter: (
                <>
                    <Select
                        options={options3}
                        onChange={handleSelectChange3}
                        value={selected3}
                    />

                    {(selected3 === "isafter" || selected3 === "isbefore") && (
                        <div style={{ marginTop: "12px" }}>
                            <DatePicker
                                month={month}
                                year={year}
                                selected={selectedDates}
                                onChange={handleDateChange}
                                onMonthChange={(month, year) => setDate({ month, year })}
                            />
                        </div>
                    )}

                    {/* If Select = isafterxdaysago or isbeforexdaysago → show text input */}
                    {(selected3 === "isafterxdaysago" || selected3 === "isbeforexdaysago") && (
                        <div style={{ marginTop: "12px" }}>
                            <TextField
                                labelHidden
                                label="Days ago"
                                type="number"
                                placeholder="Enter number of days"
                                value={daysAgo}
                                onChange={setDaysAgo}
                            />
                        </div>
                    )}
                </>
            ),
            shortcut: true,
        },

        {
            key: 'DateUpdated',
            label: 'Date Updated',
            filter: (
                <>
                    <Select
                        options={options4}
                        onChange={handleSelectChange4}
                        value={selected4}
                    />

                    {(selected4 === "isafter" || selected4 === "isbefore") && (
                        <div style={{ marginTop: "12px" }}>
                            <DatePicker
                                month={month}
                                year={year}
                                selected={selectedDates}
                                onChange={handleDateChange}
                                onMonthChange={(month, year) => setDate({ month, year })}
                            />
                        </div>
                    )}

                    {/* If Select = isafterxdaysago or isbeforexdaysago → show text input */}
                    {(selected4 === "isafterxdaysago" || selected4 === "isbeforexdaysago") && (
                        <div style={{ marginTop: "12px" }}>
                            <TextField
                                labelHidden
                                label="Days ago"
                                type="number"
                                placeholder="Enter number of days"
                                value={daysAgo}
                                onChange={setDaysAgo}
                            />
                        </div>
                    )}
                </>
            ),
            shortcut: true,
        },

        {
            key: 'Description',
            label: 'Description',
            filter: (
                <>
                    <Select
                        options={options5}
                        onChange={handleSelectChange5}
                        value={selected5}
                    />
                    <TextField
                        value={value5}
                        placeholder='Start typing a description'
                        onChange={handleChange5}
                        autoComplete="off"
                    />
                </>
            ),
            shortcut: true,
        },

        {
            key: 'productType',
            label: 'Product type',
            filter: (
                <ChoiceList
                    title="Product type"
                    titleHidden
                    choices={[
                        { label: 'T-Shirt', value: 'T-Shirt' },
                        { label: 'Accessory', value: 'Accessory' },
                        { label: 'Gift card', value: 'Gift card' },
                    ]}
                    selected={productType || []}
                    onChange={handleProductTypeChange}
                    allowMultiple
                />
            ),
        },
        {
            key: 'taggedWith',
            label: 'Tagged with',
            filter: (
                <TextField
                    label="Tagged with"
                    value={taggedWith}
                    onChange={handleTaggedWithChange}
                    autoComplete="off"
                    labelHidden
                />
            ),
        },
    ];

    const appliedFilters = [];
    if (!isEmpty(availability)) {
        const key = 'availability';
        appliedFilters.push({
            key,
            label: disambiguateLabel(key, availability),
            onRemove: handleAvailabilityRemove,
        });
    }
    if (!isEmpty(productType)) {
        const key = 'productType';
        appliedFilters.push({
            key,
            label: disambiguateLabel(key, productType),
            onRemove: handleProductTypeRemove,
        });
    }
    if (!isEmpty(taggedWith)) {
        const key = 'taggedWith';
        appliedFilters.push({
            key,
            label: `Tagged with ${taggedWith}`,
            onRemove: handleTaggedWithRemove,
        });
    }
    const [products, setProducts] = useState([]);
    const [productTypesList, setProductTypesList] = useState([]);

    useEffect(() => {
        fetch('/api/products')
            .then((res) => res.json())
            .then((data) => {
                const types = [...new Set(data.map(p => p.product_type).filter(Boolean))];
                setProductTypesList(types);

                const rows = data.map(product => {
                    const variant = product.variants[0] || {};
                    const price = Number(variant.price || 0);
                    const qty = Number(variant.inventory_quantity || 0);
                    const image = product.images?.length > 0 ? product.images[0].src : null;

                    return [
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                            {image
                                ? <img src={image} style={{ width: 40, height: 40, borderRadius: 4 }} alt={product.title} />
                                : <div style={{
                                    width: 40, height: 40, background: '#f4f6f8',
                                    borderRadius: 4, border: '1px solid #dfe3e8'
                                }} />
                            }
                            <Text variant="bodyMd">{product.title}</Text>
                        </div>,
                        `$${price}`,
                        variant.sku || "-",
                        qty,
                        `$${(price * qty).toFixed(2)}`
                    ];
                });
                setProducts(rows);
            });
    }, []);

    return (
        <Page>
            {/* <div style={{ padding: '0 32px' }}> */}
            <Box padding="2">
                <LegacyStack distribution="equalSpacing" alignment="center">
                    <Text variant="headingLg" as="h1">Products</Text>
                    <LegacyStack spacing="tight">
                        <Button>Export</Button>
                        <Button variant='primary'>Edit products</Button>
                    </LegacyStack>
                </LegacyStack>
            </Box>
            <br />
            <Card sectioned>
                <LegacyStack distribution="fillEvenly" alignment="center">
                    <LegacyStack vertical spacing="tight" alignment="center">
                        <Text variant="bodyMd" color="subdued">Products selected</Text>
                        <Text variant="headingXl" fontWeight="bold">17</Text>
                    </LegacyStack>

                    <div style={{ borderLeft: '1px solid #dfe3e8', height: '40px' }} />

                    <LegacyStack vertical spacing="tight" alignment="center">
                        <LegacyStack alignment="center" spacing="extraTight">
                            <Text variant="bodyMd" fontWeight="medium">Your first bulk edit</Text>
                            <Icon source={LightbulbIcon} color="warning" />
                        </LegacyStack>
                        <Text variant="bodyMd" color="subdued">Quickly & safely modify your products at once</Text>
                    </LegacyStack>

                    <div style={{ borderLeft: '1px solid #dfe3e8', height: '40px' }} />

                    <LegacyStack vertical spacing="tight" alignment="center">
                        <LegacyStack alignment="center" spacing="extraTight">
                            <Text variant="bodyMd" fontWeight="medium">Search tips</Text>
                            <Icon source={SearchIcon} color="base" />
                        </LegacyStack>
                        <Text variant="bodyMd" color="subdued">Learn how to find the products to edit</Text>
                    </LegacyStack>
                </LegacyStack>
            </Card>

            <br />

            <Card>
                <Box padding="4">
                    <LegacyStack alignment="center" spacing="tight">
                        <Badge>All</Badge>
                        <div style={{ flex: 1 }} />
                    </LegacyStack>
                </Box>
                <br />
                <Divider />
                <Filters
                    queryValue={queryValue}
                    queryPlaceholder="Search items"
                    filters={filters}
                    appliedFilters={appliedFilters}
                    onQueryChange={handleFiltersQueryChange}
                    onQueryClear={handleQueryValueRemove}
                    onClearAll={handleFiltersClearAll}
                />

                <Divider />

                <DataTable
                    columnContentTypes={['text', 'numeric', 'numeric', 'numeric', 'numeric']}
                    headings={['Product', 'Price', 'SKU', 'Quantity', 'Net Sales']}
                    rows={products}
                    totals={['', '', '',
                        products.reduce((sum, row) => sum + (parseInt(row[3]) || 0), 0),
                        `$${products.reduce((sum, row) => {
                            const price = parseFloat(row[1]?.replace('$', '') || 0);
                            const qty = parseInt(row[3]) || 0;
                            return sum + (price * qty);
                        }, 0).toFixed(2)}`
                    ]}
                />
            </Card>
            {/* </div> */}
        </Page>
    );

    function disambiguateLabel(key, value) {
        switch (key) {
            case 'taggedWith':
                return `Tagged with ${value}`;
            case 'availability':
                return value.map((val) => `Available on ${val}`).join(', ');
            case 'productType':
                return value.join(', ');
            default:
                return value.toString();
        }
    }

    function isEmpty(value) {
        if (Array.isArray(value)) {
            return value.length === 0;
        } else {
            return value === '' || value == null;
        }
    }
}