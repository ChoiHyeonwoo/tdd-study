using System;
using System.Linq;

namespace Variance
{
    class Program
    {
        static void Main(string[] args) => Console.WriteLine(args.Length switch {
            0 => "데이터가 입력되지 않았습니다.",
            1 => "데이터를 두개이상 입력하시오.",
            _ => GetVarianceOutput(args)
        });

        private static string GetVarianceOutput(string[] args)
        {
            // 1. 분산을 구하기 위한 프로그램 작성
            double[] s = ParseArguments(args);
            double mean = CalculateMeans(s);

            double sumOfSquares = CalculateSumofSquare(s, mean);
            double variance = sumOfSquares / (s.Length - 1);

            return $"분산 : {variance}";
        }

        private static double CalculateSumofSquare(double[] s, double mean)
        {
            return s.Select(x => x - mean)
                    .Select(x => x * x)
                    .Sum();
        }

        private static double CalculateMeans(double[] s)
            => s.Average();

        private static double[] ParseArguments(string[] args)
            => args.Select(double.Parse).ToArray();
    }
}
