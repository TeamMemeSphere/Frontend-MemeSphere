import { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { useFetchCoin } from "../../hooks/common/useFetchCoin";
import styled from "styled-components";

// Chart.js에 필요한 요소 등록
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
);

interface VolumeData {
  time: Date;
  volume: number;
}

interface VolumeChartProps {
  symbol: string;
  interval: string;
}

const VolumeChart: React.FC<VolumeChartProps> = ({ symbol, interval }) => {
  const [chartData, setChartData] = useState<any>(null);
  const { getVolumeData, isLoading } = useFetchCoin();

  useEffect(() => {
    let isMounted = true;
    const fetchData = async () => {
      const data = await getVolumeData(symbol, interval);
      if (isMounted && data) {
        setChartData({
          labels: data.map((item: VolumeData) => item.time),
          datasets: [
            {
              label: "거래량",
              data: data.map((item: VolumeData) => item.volume),
              backgroundColor: "rgba(112, 97, 240, 0.6)",
              borderWidth: 0,
            },
          ],
        });
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, [symbol, interval]);

  if (isLoading) return <p>Loading...</p>;

  const options: ChartOptions<"bar"> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: false,
      },
    },
    scales: {
      x: {
        type: "category",
        ticks: {
          callback: function (value, index) {
            const date = new Date(chartData.labels[index]);
            const hour = date.getHours();

            if (hour % 4 === 0) {
              const now = new Date();
              const isToday =
                date.getFullYear() === now.getFullYear() &&
                date.getMonth() === now.getMonth() &&
                date.getDate() === now.getDate();

              return isToday
                ? `${hour}:00`
                : `${date.getMonth() + 1}/${date.getDate()} ${hour}:00`;
            }

            return "";
          },
          maxRotation: 0, // 라벨 기울기 제거
          minRotation: 0, // 라벨 기울기 제거
          font: {
            size: 12, // 라벨 글자 크기
          },
        },
        grid: {
          display: false,
        },
      },
      y: {
        type: "linear",
        beginAtZero: true,
        ticks: {
          display: false,
        },
        grid: {
          color: "rgba(255, 255, 255, 0.10)",
          lineWidth: 1,
        },
      },
    },
  };

  return chartData ? (
    <ChartWrapper>
      <ChartInnerWrapper>
        <ChartContainer
          style={{ minWidth: `${chartData.labels.length * 24.6}px` }}
        >
          <Bar data={chartData} options={options} />
        </ChartContainer>
      </ChartInnerWrapper>
    </ChartWrapper>
  ) : (
    <p>No Data Available</p>
  );
};

export default VolumeChart;

const ChartWrapper = styled.div`
  width: 100%;
  height: 90%;
  overflow: hidden;
`;

const ChartInnerWrapper = styled.div`
  width: 100%;
  height: calc(100% - 1px); /* 스크롤바를 위한 공간 확보 */
  overflow-x: auto;
  padding: 0;
  display: flex;
  justify-content: center;

  &::-webkit-scrollbar {
    height: 3px;
    border-radius: 50%;
    position: absolute;
    transform: translateY(-50%);
  }

  &::-webkit-scrollbar-thumb {
    background-color: rgba(255, 255, 255, 0.5);
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }
`;

const ChartContainer = styled.div`
  height: 90%;
  display: flex;
  align-items: flex-end;
`;
