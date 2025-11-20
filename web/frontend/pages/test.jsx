import { useState, useCallback, useMemo, useEffect } from 'react';
import {
    Card, Text, LegacyStack, Icon, Badge, Divider, Autocomplete, ChoiceList, TextField, LegacyCard, Filters, DataTable,
    Button, Popover, ActionList, Page, Box,
} from '@shopify/polaris';
import { LightbulbIcon, SearchIcon, FilterIcon } from '@shopify/polaris-icons';

export default function BulkEditCard() {
    const [availability, setAvailability] = useState([]);
    const [productType, setProductType] = useState([]);
    const [vendor, setVendor] = useState([]);
    const [hasImage, setHasImage] = useState([]);
    const [taggedWith, setTaggedWith] = useState('');
    const [queryValue, setQueryValue] = useState('');
    const [products, setProducts] = useState([]);
    const [productTypesList, setProductTypesList] = useState([]);
    const [filterPopoverActive, setFilterPopoverActive] = useState(false);

    // Filter options structure matching your screenshot
    const filterOptions = [
        {
            title: 'Product Fields',
            items: [
                'Category',
                'Collection',
                'Date created',
                'Date Published',
                'Date Updated',
                'Description',
                'Handle (URL)',
                'Inventory Quantity',
                'Option 1 Name',
                'Option 2 Name',
                'Option 3 Name',
                'Product ID',
                'Product Type (Custom)',
                'Search Engine Visibility (SEO)',
                'Status',
                'Tag',
                'Theme Template',
                'Title',
                'Variant Count',
                'Vendor',
                'Visible on Online Store (web)',
                'Visible on Point of Sale (POS)'
            ]
        },
        {
            title: 'Variant Fields',
            items: [
                'Barcode (ISBN, UPC, GTIN, etc.)',
                'Charge tax on this product',
                'Compare-at-price',
                'Connected Inventory Location',
                'Cost',
                'Country of Origin',
                'HS Tariff Code',
                'Inventory Out of Stock Policy',
                'Option 1 value',
                'Option 2 value',
                'Option 3 value',
                'Physical Product',
                'Price',
                'Profit Margin',
                'SKU',
                'Track Quantity',
                'Variant Inventory Quantity',
                'Variant Title',
                'Weight',
                'Weight Unit'
            ]
        },
        {
            title: 'Inventory at location',
            items: [
                'Customall Inventory',
                'Shop Location Inventory',
            ]
        },
        {
            title: 'Google Shopping',
            items: [
                'Google Shopping - Age Group',
                'Google Shopping - Category',
                'Google Shopping - Color',
                'Google Shopping - Condition',
                'Google Shopping - Custom Label 0',
                'Google Shopping - Custom Label 1',
                'Google Shopping - Custom Label 2',
                'Google Shopping - Custom Label 3',
                'Google Shopping - Custom Label 4',
                'Google Shopping - Custom Product',
                'Google Shopping - Gender',
                'Google Shopping - Manufacturer Part Number (MNP)',
                'Google Shopping - Material',
                'Google Shopping - Size',
                'Google Shopping - Size System',
                'Google Shopping - Size Type'
            ]
        },
        {
            title: 'Category metafields',
            items: [
                'Age Group',
                'Color',
                'Leg color',
                'Size',
                'Tabletop color',
                'Target gender'
            ]
        },
        {
            title: 'Custom',
            items: [
                'Specific products',
                'Compare-at Price is Blank',
                'Doesnt have images',
                'Has Dublicate Barcode',
                'Has Dublicate SKU',
                'Has Dublicate Title',
                'Has Images',
                'Not in any Collection',
                'Price < Compare-at-Price',
                'Price = Compare-at-Price',
                'Price > Compare-at-Price',
                ''
            ]
        }
    ];

    // Initial data load
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

    // Filter handlers
    const handleAvailabilityChange = useCallback((value) => setAvailability(value), []);
    const handleProductTypeChange = useCallback((value) => setProductType(value), []);
    const handleVendorChange = useCallback((value) => setVendor(value), []);
    const handleHasImageChange = useCallback((value) => setHasImage(value), []);
    const handleTaggedWithChange = useCallback((value) => setTaggedWith(value), []);
    const handleQueryValueChange = useCallback((value) => setQueryValue(value), []);

    const handleClear = () => {
        setAvailability([]);
        setProductType([]);
        setVendor([]);
        setHasImage([]);
        setTaggedWith('');
        setQueryValue('');
    };

    // Filter popover handlers
    const toggleFilterPopover = useCallback(() => setFilterPopoverActive((active) => !active), []);
    const handleFilterSelect = useCallback((selectedFilter) => {
        console.log('Selected filter:', selectedFilter);
        setFilterPopoverActive(false);
    }, []);

    const filterPopover = (
        <Popover
            active={filterPopoverActive}
            activator={
                <Button onClick={toggleFilterPopover} icon={FilterIcon}>
                    Add filter +
                </Button>
            }
            onClose={toggleFilterPopover}
            sectioned
        >
            <Box padding="4">
                <Text variant="headingMd" as="h3">Add filter +</Text>
            </Box>

            <Box padding="4">
                <TextField
                    label="Start typing"
                    labelHidden
                    placeholder="Start typing"
                    value={queryValue}
                    onChange={handleQueryValueChange}
                    autoComplete="off"
                />
            </Box>

            {filterOptions.map((section, index) => (
                <Box key={index} padding="4">
                    <Text variant="headingSm" as="h4" fontWeight="bold">{section.title}</Text>
                    <ActionList
                        items={section.items.map(item => ({
                            content: item,
                            onAction: () => handleFilterSelect(item),
                        }))}
                    />
                </Box>
            ))}
        </Popover>
    );

    // Applied filters logic
    const appliedFilters = [];
    if (availability.length > 0) {
        appliedFilters.push({
            key: 'availability',
            label: `Availability: ${availability.join(', ')}`,
            onRemove: () => setAvailability([]),
        });
    }
    if (productType.length > 0) {
        appliedFilters.push({
            key: 'productType',
            label: `Product Type: ${productType.join(', ')}`,
            onRemove: () => setProductType([]),
        });
    }
    if (vendor.length > 0) {
        appliedFilters.push({
            key: 'vendor',
            label: `Vendor: ${vendor.join(', ')}`,
            onRemove: () => setVendor([]),
        });
    }
    if (taggedWith) {
        appliedFilters.push({
            key: 'taggedWith',
            label: `Tagged with: ${taggedWith}`,
            onRemove: () => setTaggedWith(''),
        });
    }

    return (
        <Page>
            {/* <div style={{ padding: '0 32px' }}> */}
            {/* Header with title and buttons */}
            <Box padding="2">
                <LegacyStack distribution="equalSpacing" alignment="center">
                    <Text variant="headingLg" as="h1">Products</Text>
                    <LegacyStack spacing="tight">
                        <Button>Export</Button>
                        <Button primary>Edit products</Button>
                    </LegacyStack>
                </LegacyStack>
            </Box>
            <br />
            {/* Stats Card */}
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

            {/* Main Content Card */}
            <Card>
                {/* Filter Header */}
                <Box padding="4">
                    <LegacyStack alignment="center" spacing="tight">
                        <Badge>All</Badge>
                        <div style={{ flex: 1 }} />
                        {filterPopover}
                    </LegacyStack>
                </Box>

                <Divider />

                {/* Search and Applied Filters */}
                <Box padding="4">
                    <Filters
                        queryValue={queryValue}
                        queryPlaceholder="Search items"
                        filters={[]}
                        appliedFilters={appliedFilters}
                        onQueryChange={handleQueryValueChange}
                        onQueryClear={() => setQueryValue('')}
                        onClearAll={handleClear}
                    />
                </Box>

                <Divider />

                {/* Products Table */}
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
}