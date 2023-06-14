import { ReservoirChain } from '@reservoir0x/reservoir-sdk'
import React, { FC } from 'react'
import {
  Flex,
  FormatCryptoCurrency,
  FormatCurrency,
  Img,
  Text,
} from '../../primitives'
import { useCollections } from '../../hooks'
import { MintCurrency } from './MintModalRenderer'

enum Size {
  SM,
  LG,
}

type Props = {
  collection?: NonNullable<ReturnType<typeof useCollections>['data']>[0]
  itemCount: number
  totalPrice: number
  usdPrice: number
  currency?: MintCurrency
  chain?: ReservoirChain | null
  size?: Size
}

export const MintCheckout: FC<Props> = ({
  collection,
  itemCount,
  totalPrice,
  usdPrice,
  currency,
  chain,
}) => {
  const itemSubject = itemCount > 1 ? 'items' : 'item'

  return (
    <Flex direction="column">
      <Flex justify="between" css={{ width: '100%', mb: '$2' }}>
        <Text style="subtitle2" color="subtle">
          Item
        </Text>
        <Text style="subtitle2" color="subtle">
          Total
        </Text>
      </Flex>
      <Flex justify="between" align="start" css={{ width: '100%' }}>
        <Flex direction="column">
          <Flex align="center" css={{ gap: '$3' }}>
            <Img
              src={collection?.image}
              css={{
                borderRadius: 8,
                objectFit: 'cover',
                height: 56,
                width: 56,
              }}
            />
            <Flex direction="column" css={{ gap: '$1' }}>
              <Text style={'h6'}>{collection?.name}</Text>
              <Text
                style={'tiny'}
                css={{
                  p: '$1',
                  borderRadius: 4,
                  backgroundColor: '$neutralBgActive',
                  width: 'max-content',
                }}
              >
                {itemCount} {itemSubject}
              </Text>
            </Flex>
          </Flex>
        </Flex>
        <Flex direction="column" align="end" css={{ gap: '$1', pt: '$1' }}>
          <FormatCryptoCurrency
            textStyle={'h6'}
            amount={totalPrice}
            address={currency?.contract}
            decimals={currency?.decimals}
            symbol={currency?.symbol}
            logoWidth={18}
            chainId={chain?.id}
          />
          {usdPrice ? (
            <FormatCurrency
              amount={usdPrice * totalPrice}
              style="subtitle2"
              color="subtle"
              css={{ textAlign: 'end' }}
            />
          ) : null}
        </Flex>
      </Flex>
    </Flex>
  )
}
