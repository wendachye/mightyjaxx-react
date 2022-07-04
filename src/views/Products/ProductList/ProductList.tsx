import { useCallback, useEffect, useState } from 'react';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import loadingSVG from 'assets/loading-brand.svg';
import { deleteProduct, fetchProducts, selectProducts } from 'redux/slices/productSlice';
import { push } from 'redux-first-history';
import { theme } from 'styles/theme';

import Button from 'components/Button';
import Container from 'components/Container';
import Input from 'components/Input';
import Modal from 'components/Modal/Modal';
import Pagination from 'components/Paginate';
import Title from 'components/Title';
import useMediaQuery from 'hooks/useMediaQuery';
import { useDispatch, useSelector } from 'hooks/useRedux';
import {
  Flex,
  Loading,
  LoadingContainer,
  ModalDeleteButtonContainer,
  ProductCreateContainer,
  ProductDeleteContainer,
  ProductImage,
  ProductListHeader,
  ProductSearchContainer,
  Table,
  TD,
  TH,
  TR,
} from './ProductList.styles';

const ProductList = () => {
  const dispatch = useDispatch();
  const isDesktop = useMediaQuery(`(min-width:${theme.breakpoints.sm})`);
  const { products, loading } = useSelector(selectProducts);
  const [search, setSearch] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [skuToDelete, setSkuToDelete] = useState<string | null>(null);

  useEffect(() => {
    dispatch(fetchProducts.trigger());
  }, []);

  const onChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handleSearch = () => {
    dispatch(fetchProducts.trigger({ search }));
  };

  const handleClear = () => {
    setSearch('');
    dispatch(fetchProducts.trigger());
  };

  const handleDeleteProduct = (e: React.MouseEvent<SVGSVGElement>, sku: string) => {
    e.preventDefault();
    e.stopPropagation();

    setSkuToDelete(sku);
    setModalVisible(true);
  };

  const onClickDeleteProduct = useCallback(() => {
    if (skuToDelete) {
      dispatch(deleteProduct.trigger({ sku: skuToDelete }));
      setModalVisible(false);
      setSkuToDelete(null);
    }
  }, [skuToDelete]);

  const handleCreate = () => {
    dispatch(push('/products/create'));
  };

  const onClickProduct = (sku: string) => {
    dispatch(push(`/products/${sku}`));
  };

  const onClickNextPage = useCallback(() => {
    if (products?.page) {
      dispatch(fetchProducts({ page: products.page + 1 }));
    }
  }, [products?.page]);

  const onClickPreviousPage = useCallback(() => {
    if (products?.page) {
      dispatch(fetchProducts({ page: products.page - 1 }));
    }
  }, [products?.page]);

  const onClickPageNumber = useCallback(
    (page: number) => {
      if (page !== products?.page) {
        dispatch(fetchProducts({ page }));
      }
    },
    [products?.page]
  );

  return (
    <Container>
      <ProductListHeader isDesktop={isDesktop}>
        <ProductSearchContainer isDesktop={isDesktop}>
          <Input
            width="11.25rem"
            type="text"
            placeholder="Search"
            value={search}
            onChange={onChangeSearch}
          />
          <Flex>
            <Button margin={isDesktop ? '0 0.25rem' : '0'} onClick={handleSearch}>
              Search
            </Button>
            <Button margin="0 0.25rem" onClick={handleClear}>
              Clear
            </Button>
          </Flex>
        </ProductSearchContainer>
        <ProductCreateContainer isDesktop={isDesktop}>
          <Button margin={isDesktop ? '0' : '0.5rem 0'} onClick={handleCreate}>
            Create
          </Button>
        </ProductCreateContainer>
      </ProductListHeader>
      {loading ? (
        <LoadingContainer>
          <Loading src={loadingSVG} alt={'loading'} />
        </LoadingContainer>
      ) : (
        <>
          <Table isDesktop={isDesktop}>
            <thead>
              <TR>
                <TH># No</TH>
                <TH>sku</TH>
                <TH>title</TH>
                {isDesktop && <TH>Image</TH>}
                <TH></TH>
              </TR>
            </thead>
            <tbody>
              {products?.records.map((product, index) => (
                <TR key={product.id} onClick={() => onClickProduct(product.sku)}>
                  <TD>{`${index + 1}`}</TD>
                  <TD>{product.sku}</TD>
                  <TD>{product.title}</TD>
                  {isDesktop && (
                    <TD>
                      <ProductImage
                        src={`${process.env.REACT_APP_ADMIN_API_V1_BASE_URL}${product.imageURL}`}
                        alt={`product-${product.sku}`}
                      />
                    </TD>
                  )}
                  <TD>
                    <ProductDeleteContainer>
                      <FontAwesomeIcon
                        icon={faTrashCan}
                        size="lg"
                        onClick={e => handleDeleteProduct(e, product.sku)}
                      />
                    </ProductDeleteContainer>
                  </TD>
                </TR>
              ))}
            </tbody>
          </Table>
          {products?.totalCount === 0 && <span>No records found</span>}
          <Pagination
            onClickNextPage={onClickNextPage}
            onClickPreviousPage={onClickPreviousPage}
            onClickPageNumber={onClickPageNumber}
            currentPage={products?.page || 1}
            totalPages={products?.totalPages || 1}
            totalCount={products?.totalCount || 0}
            hasPreviousPage={products?.hasPreviousPage || false}
            hasNextPage={products?.hasNextPage || false}
          />
        </>
      )}
      <Modal visible={modalVisible} onClose={() => setModalVisible(false)}>
        <Title as="h3">Are you sure you want to delete this product?</Title>
        <ModalDeleteButtonContainer>
          <Button width="7.5rem" margin="0 0.5rem" onClick={() => setModalVisible(false)}>
            Cancel
          </Button>
          <Button width="7.5rem" margin="0 0.5rem" onClick={onClickDeleteProduct}>
            Confirm
          </Button>
        </ModalDeleteButtonContainer>
      </Modal>
    </Container>
  );
};

export default ProductList;
